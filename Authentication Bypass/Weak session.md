
##### Example:
```
session=757365723d6874622d7374646e743b726f6c653d75736572
```

Decode hex:
```bash
echo -n '757365723d6874622d7374646e743b726f6c653d75736572' | xdd -r -p
```

Encode hex:
```bash
echo -n 'user=htb-stdnt;role=admin' | xxd -p
```

##### Other methods
https://owasp.org/www-community/attacks/Session_fixation
https://owasp.org/www-community/Session_Timeout

##### Advanced HTB module:
https://academy.hackthebox.com/module/details/189
