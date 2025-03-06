##### Filter by pattern
1 uppercase, 1 lowercase, 1 digit and length of 12
```bash
grep '[[:upper:]]' rockyou.txt | grep '[[:lower:]]' | grep '[[:digit:]]' | grep -E '.{12}' > pwds.txt
```

#### Default creds
https://github.com/ihebski/DefaultCreds-cheat-sheet
```bash
pip3 install defaultcreds-cheat-sheet
creds search tomcat
```