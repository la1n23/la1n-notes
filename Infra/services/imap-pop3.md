[[email]]
##### Footprinting
```shell-session
sudo nmap 10.129.14.128 -sV -p110,143,993,995 -sC
```
#### curl
```bash
curl -k 'imaps://10.129.14.128' --user cry0l1t3:1234 -v
```
#### OpenSSL - TLS Encrypted Interaction
```shell
openssl s_client -connect 10.129.14.128:pop3s
```

```shell
openssl s_client -connect 10.129.14.128:imaps
```
#### Imap usage:
```shell
1337 login tom NMds732Js2761
1337 list "" *
1337 select "INBOX"
1337 fetch 1 (body[])
```
another example:
```bash
telnet 10.10.14.221 143
11 login "marlin@inlanefreight.htb" "poohbear"
12 select "INBOX"
13 FETCH 1 BODY[]
```