#### Find subdomains:
```shell
dig axfr inlanefreight.htb @10.129.14.128
```

#### Subdomain Brute Forcing
[[Virtual hosts]]
```shell
dnsenum --dnsserver 10.129.14.128 --enum -p 0 -s 0 -o subdomains.txt -f /opt/useful/seclists/Discovery/DNS/subdomains-top1million-110000.txt inlanefreight.htb
```

#### Get IPs by domain:
```shell
dig +short hackthebox.com

104.18.20.126
104.18.21.126
```




