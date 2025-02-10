[[metasploit nmap]]
* TCP connect scan (3 way handshaking)
````shell
sudo nmap -sT MACHINE_IP
````
* TCP SYN Scan
```shell
sudo nmap -sS IP
```
* UDP Scan
```shell
sudo nmap -sU IP
```
![[nmap - port scanning -cheatsheet.png]]

* Null scan - no response means port either open either filtered - `nmap -sN IP`
* FIN scan - same as the above one - `nmap -sF IP`
* Xmas scan - sends FIN, PSH, URG - same as above one - `nmap -sX IP`
* TCP ACK Scan - not blocked by firewall - `nmap -sA IP`
* Window Scan - not blocked by firewall - `nmap -sW IP`
* Custom flag - `--scanflags RSTSYNFIN`
*


![[Pasted image 20250116165707.png]]


* Services scan `nmap -sV --version-light IP`
* OS detect `nmap -O IP`
*

![[Pasted image 20250116185148.png]]


```bash
nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse 10.10.105.240
 
 nmap --script smb-os-discovery.nse -p445 10.10.10.40

nmap ip -vvv

nmap --script vuln ip

nmap -p 111 --script=nfs-ls,nfs-statfs,nfs-showmount 10.10.105.240

nmap -sV -sC 10.10.166.159 -Pn
```

default scripts:
```bash
nmap -sV -sC 
```

`--script-args http.useragent="CUSTOM_AGENT"`

`nmap -sV --script=banner`