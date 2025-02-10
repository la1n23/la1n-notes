
### Tools

#### ffuf
`ffuf -w /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt -u http://MACHINE_IP/FUZZ`

Proxy:
`-x http://localhost:8080`

```shell
ffuf -w /opt/useful/seclists/Discovery/Web-Content/web-extensions.txt:FUZZ -u http://SERVER_IP:PORT/blog/indexFUZZ
```

```shell
ffuf -w /opt/useful/seclists/Discovery/Web-Content/directory-list-2.3-small.txt:FUZZ -u http://SERVER_IP:PORT/blog/FUZZ.php
```

-ic - ignore comments in wordlists

API endpoints:
```
https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/common-api-endpoints-mazen160.txt
```



recursive scan:
```shell
ffuf -w /opt/useful/seclists/Discovery/Web-Content/directory-list-2.3-small.txt:FUZZ -u http://SERVER_IP:PORT/FUZZ -recursion -recursion-depth 1 -e .php -v
```


scan for query params:
```bash
ffuf -w /opt/useful/seclists/Discovery/Web-Content/burp-parameter-names.txt:FUZZ -u http://admin.academy.htb:53809/admin/admin.php?FUZZ=key -fs 798
```


scan for common dirs:

```shell
ffuf -w /opt/useful/seclists/Discovery/Web-Content/common.txt -u http://dev.linkvortex.htb/FUZZ -recursion -recursion-depth 1 -mc 200 -ic -t 100 2>/dev/null
```

#### dirb
`dirb http://MACHINE_IP/ /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt`

#### gobuster
  `gobuster dir --url http://MACHINE_IP/ -w /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt`

### Wordlist

directories wordlist: `/usr/share/wordlists/dirb/big.txt` 

https://github.com/danielmiessler/SecLists

Amass - subdomains discovery

#ffuf 