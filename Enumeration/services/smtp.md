
```shell
sudo nmap 10.129.14.128 -sC -sV -p25
```

```shell
sudo nmap 10.129.14.128 -p25 --script smtp-open-relay -v
```

#### Show banner
[[telnet]]
`telnet ip 25`

#### Enumerate users:
[[enumeration]]
[[wordlist]]
```bash
wget https://academy.hackthebox.com/storage/resources/Footprinting-wordlist.zip
unzip Footprinting-wordlist.zip
```

```shell
smtp-user-enum -M VRFY -U ./footprinting-wordlist.txt -t STMIP -m 60 -w 20
```


