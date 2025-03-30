````shell
ffuf -w /usr/share/wordlists/SecLists/Discovery/DNS/namelist.txt -H "Host: FUZZ.acmeitsupport.thm" -u http://MACHINE_IP -fs {size}
````

```shell
ffuf -w /opt/useful/seclists/Discovery/DNS/subdomains-top1million-5000.txt:FUZZ -u https://FUZZ.inlanefreight.com/
```

```shell
gobuster vhost -u http://inlanefreight.htb:56322 -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt --apend-domain

gobuster vhost -u http://inlanefreight.htb:56322 -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt --exclude-length 421

gobuster vhost -u http://inlanefreight.htb:81 -w /usr/share/seclists/Discovery/Web-Content/common.txt --append-domain
```