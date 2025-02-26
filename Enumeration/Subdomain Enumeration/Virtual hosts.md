````shell
ffuf -w /usr/share/wordlists/SecLists/Discovery/DNS/namelist.txt -H "Host: FUZZ.acmeitsupport.thm" -u http://MACHINE_IP -fs {size}
````


```shell
ffuf -w /opt/useful/seclists/Discovery/DNS/subdomains-top1million-5000.txt:FUZZ -u https://FUZZ.inlanefreight.com/
```

Amass - subdomains discovery

https://github.com/epi052/feroxbuster

https://github.com/OJ/gobuster

```shell
gobuster vhost -u http://inlanefreight.htb:56322 -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt --apend-domain
```
[[gobuster]] [[ffuf]] [[Virtual hosts]]