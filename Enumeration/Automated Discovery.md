
### Tools

#### Faster [[nmap]]:
https://github.com/RustScan/RustScan
```bash
wget https://github.com/RustScan/RustScan/releases/download/2.4.1/x86_64-linux-rustscan.tar.gz.zip
unzip x86_64-linux-rustscan.tar.gz.zip 
tar xf ./x86_64-linux-rustscan.tar.gz 

./rustscan -a 10.10.10.1

./rustscan -a 10.129.136.9 -p 8080 -- -sV
```

#### [[ffuf]]
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

API endpoints [[wordlist]]:
```
https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/common-api-endpoints-mazen160.txt
```

**recursive scan**:
```shell
ffuf -w /opt/useful/seclists/Discovery/Web-Content/directory-list-2.3-small.txt:FUZZ -u http://SERVER_IP:PORT/FUZZ -recursion -recursion-depth 1 -e .php -v
```

**scan for query params**:
```bash
ffuf -w /opt/useful/seclists/Discovery/Web-Content/burp-parameter-names.txt:FUZZ -u http://admin.academy.htb:53809/admin/admin.php?FUZZ=key -fs 798
```


**scan for common dirs**:
```shell
ffuf -w /opt/useful/seclists/Discovery/Web-Content/common.txt -u http://dev.linkvortex.htb/FUZZ -recursion -recursion-depth 1 -mc 200 -ic -t 100 2>/dev/null
```

username enumeration:
````shell
ffuf -w /usr/share/wordlists/SecLists/Usernames/Names/names.txt -X POST -d "username=FUZZ&email=x&password=x&cpassword=x" -H "Content-Type: application/x-www-form-urlencoded" -u http://MACHINE_IP/customers/signup -mr "username already exists"
````
#### feroxbuster
https://github.com/epi052/feroxbuster
```bash
curl -sL https://raw.githubusercontent.com/epi052/feroxbuster/main/install-nix.sh | bash -s $HOME/.local/bin
```
```bash
feroxbuster --url http://10.129.136.9:8080 --slient
feroxbuster --url http://10.129.136.9:8080 -o urls.txt
```

#### dirb (outdated)
`dirb http://MACHINE_IP/ /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt`

#### gobuster
`gobuster dir --url http://MACHINE_IP/ -w /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt`

### Wordlist
[[wordlist]]
directories wordlist: `/usr/share/wordlists/dirb/big.txt` 
https://github.com/danielmiessler/SecLists

Wordlist generator: https://github.com/digininja/CeWL

[[Virtual hosts]]
