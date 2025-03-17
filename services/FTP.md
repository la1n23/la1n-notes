#### Connect
```bash
ftp 10.129.110.152 2121
```
#### Anon user
```
anonymous
```
[[nmap]] -sC includes `ftp-anon` script
#### Download All Available Files
```shell
wget -m --no-passive ftp://anonymous:anonymous@10.129.14.136
```
#### Upload file
```bash
put file.txt
```
#### Hint
Check the files in the directory by command ls, if you get the response with “Entering Extended Passive Mode (|||49270|)” enter the command “passive off” and “ascii mode on”

# FTP Bounce Attack
https://www.geeksforgeeks.org/what-is-ftp-bounce-attack/
Scan an internal host `172.17.0.2` using a FTP as intermediate host.
[[nmap]]
```bash
nmap -Pn -v -n -p80 -b anonymous:password@10.10.110.213 172.17.0.2
```
