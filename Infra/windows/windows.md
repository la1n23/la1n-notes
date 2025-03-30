#windows 

# Get version
```powershell
PS C:\htb> Get-WmiObject -Class win32_OperatingSystem | select Version,BuildNumber

Version    BuildNumber
-------    -----------
10.0.19041 19041
```
# NTFS permissions

| Full Control         | Allows reading, writing, changing, deleting of files/folders.                                                                                                                                                                                                                                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Modify               | Allows reading, writing, and deleting of files/folders.                                                                                                                                                                                                                                                                                                                                    |
| List Folder Contents | Allows for viewing and listing folders and subfolders as well as executing files. Folders only inherit this permission.                                                                                                                                                                                                                                                                    |
| Read and Execute     | Allows for viewing and listing files and subfolders as well as executing files. Files and folders inherit this permission.                                                                                                                                                                                                                                                                 |
| Write                | Allows for adding files to folders and subfolders and writing to a file.                                                                                                                                                                                                                                                                                                                   |
| Read                 | Allows for viewing and listing of folders and subfolders and viewing a file's contents.                                                                                                                                                                                                                                                                                                    |
| Traverse Folder      | This allows or denies the ability to move through folders to reach other files or folders. For example, a user may not have permission to list the directory contents or view files in the documents or web apps directory in this example c:\users\bsmith\documents\webapps\backups\backup_02042020.zip but with Traverse Folder permissions applied, they can access the backup archive. |
| Special Permissions  |                                                                                                                                                                                                                                                                                                                                                                                            |
# Integrity Control Access Control List (icacls)
```powershell
C:\htb> icacls c:\windows
c:\windows NT SERVICE\TrustedInstaller:(F)
           NT SERVICE\TrustedInstaller:(CI)(IO)(F)
           NT AUTHORITY\SYSTEM:(M)
           NT AUTHORITY\SYSTEM:(OI)(CI)(IO)(F)
           BUILTIN\Administrators:(M)
           BUILTIN\Administrators:(OI)(CI)(IO)(F)
           BUILTIN\Users:(RX)
           BUILTIN\Users:(OI)(CI)(IO)(GR,GE)
           CREATOR OWNER:(OI)(CI)(IO)(F)
           APPLICATION PACKAGE AUTHORITY\ALL APPLICATION PACKAGES:(RX)
           APPLICATION PACKAGE AUTHORITY\ALL APPLICATION PACKAGES:(OI)(CI)(IO)(GR,GE)
           APPLICATION PACKAGE AUTHORITY\ALL RESTRICTED APPLICATION PACKAGES:(RX)
           APPLICATION PACKAGE AUTHORITY\ALL RESTRICTED APPLICATION PACKAGES:(OI)(CI)(IO)(GR,GE)

Successfully processed 1 files; Failed processing 0 files
```
The possible inheritance settings are:
* (CI): container inherit
* (OI): object inherit
* (IO): inherit only
* (NP): do not propagate inherit
* (I): permission inherited from parent container

Basic access permissions are as follows:
* F : full access
* D :  delete access
* N :  no access
* M :  modify access
* RX :  read and execute access
* R :  read-only access
* W :  write-only access
## Modifying permission
Using the command icacls c:\users /grant joe:f we can grant the joe user full control over the directory, but given that (oi) and (ci) were not included in the command, the joe user will only have rights over the c:\users folder but not over the user subdirectories and files contained within them.

```powershell
C:\htb> icacls c:\users /grant joe:f
processed file: c:\users
Successfully processed 1 files; Failed processing 0 files
```

```powershell
icacls c:\users /remove joe.
```
More about icacls https://ss64.com/nt/icacls.html
# SMB permissions
* Full Control 	Users are permitted to perform all actions given by Change and Read permissions as well as change permissions for NTFS files and subfolders
* Change 	Users are permitted to read, edit, delete and add files and subfolders
* Read 	Users are allowed to view file & subfolder contents

Show shares:
```powershell
net share
```
or using tool `Computer Management`
Show logs of smb auth `Event Viewer`

# Services
Windows services are managed via the Service Control Manager (SCM) system, accessible via the `services.msc` MMC add-in.
It is also possible to query and manage services via the command line using sc.exe using PowerShell cmdlets such as Get-Service.
```powershell
Get-Service | ? {$_.Status -eq "Running"} | select -First 2 |fl

Get-Service | ? {$_.Status -eq "Running"} | fl | more

Get-Service | ? {$_.Status -eq "Running" -and $_.Name -match "Update"} | fl

Get-Service | ft DisplayName,Status 

# count running services 
Get-Service | measure

Get-Service '*Reader*' | fc

Get-Service WinDefend
Start-Service WinDefend
Stop-Service WinDefend

Set-Service -Name Spooler -StartType Disabled
```

https://docs.microsoft.com/en-us/sysinternals
```powershell
\\live.sysinternals.com\tools\procdump.exe -accepteula
```

```powershell
\\live.sysinternals.com\tools\procexp.exe
```

#### Task manager cmd:
```cmd
taskmgr
```
#### Examine services using sc:
```powershell
sc qc wuauserv

sc //hostname or ip of box query ServiceName

sc stop wuauserv

sc config wuauserv binPath=C:\Winbows\Perfectlylegitprogram.exe

```
#### Examine permissions:
```powershell
sc sdshow wuauserv

D:(A;;CCLCSWRPLORC;;;AU)(A;;CCDCLCSWRPWPDTLOCRSDRCWDWO;;;BA)(A;;CCDCLCSWRPWPDTLOCRSDRCWDWO;;;SY)S:(AU;FA;CCDCLCSWRPWPDTLOSDRCWDWO;;;WD)
```
Security descriptors identify the object’s owner and a primary group containing a Discretionary Access Control List (DACL) and a System Access Control List (SACL).
#### Examine service permissions using PowerShell:
```powershell
Get-ACL -Path HKLM:\System\CurrentControlSet\Services\wuauserv | Format-List
```
# Remote services
```powershell
get-service -ComputerName ACADEMY-ICL-DC
Get-Service -ComputerName ACADEMY-ICL-DC | Where-Object {$_.Status -eq "Running"}

```
# Sessions
* Interactive (runas, user login)
* Non-interactive (no creds, e.g. used to start services)
	1. Local System Account - `NT AUTHORITY\SYSTEM` - max priveleges
	2. Local Service Account - `NT AUTHORITY\LocalService` - less priveleges
	3. Network Service Account - `NT AUTHORITY\NetworkService`
# Powershell
https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/cmdlet-overview?view=powershell-7
```powershell
get-alias

Get-Alias -Definition 'ipconfig'

help

Get-Help Get-AppPackage
```
Run scripts:
```powershell
Import-Module .\PowerView.ps1
```
 type Get-Module to list all loaded modules and their associated commands:
```powershell
Get-Module | select Name,ExportedCommands | fl
```
show and modify run policies:
```powershell
Get-ExecutionPolicy -List

Set-ExecutionPolicy Bypass -Scope Process
```
show hidden files:
```powershell
gci -Hidden
```

## WMI
WMI is a subsystem of PowerShell that provides system administrators with powerful tools for system monitoring
```powershell
wmic /?

wmic os list brief
```
## Microsoft Management Console (MMC)
The MMC can be used to group snap-ins, or administrative tools, to manage hardware, software, and network components within a Windows host. It has been around since Windows Server 2000 and runs on all Windows versions.

# Security
### Security Identifier (SID)
```powershell
PS C:\htb> whoami /user

USER INFORMATION
----------------

User Name           SID
=================== =============================================
ws01\bob S-1-5-21-674899381-4069889467-2080702030-1002
```
`(SID)-(revision level)-(identifier-authority)-(subauthority1)-(subauthority2)-(etc)`
Get sid of a user:
```powershell
Get-WmiObject -Class Win32_Account -Filter "Name='bob.smith'"
```
### Security Accounts Manager (SAM) and Access Control Entries (ACE)
...
### User Account Control (UAC)
Is a security feature in Windows to prevent malware from running or manipulating processes that could damage the computer or its contents. 

### Regedit
https://docs.microsoft.com/en-us/windows/win32/sysinfo/registry-value-types
Stored at `C:\Windows\System32\Config\`

The user-specific registry hive (HKCU) is stored in the user folder (i.e., C:\Users\<USERNAME>\Ntuser.dat).`

while logged in to a system.
```powershell
reg query HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run
```
showing applications running under the current user while logged in to a system.
```powershell
reg query HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
```
### Local Group Policy
```powershell
gpedit.msc
```
### Windows Defender
check which protection settings are enabled.
```powershell
Get-MpComputerStatus | findstr "True"
```