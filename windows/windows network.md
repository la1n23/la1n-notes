#windows/network

```powershell
# list interfaces
get-netIPInterface

# get interface
Get-NetIPAddress -ifIndex 25

# set interface
Set-NetIPInterface -InterfaceIndex 25 -Dhcp Disabled

# set address without DHCP
Set-NetIPAddress -InterfaceIndex 25 -IPAddress 10.10.100.54 -PrefixLength 24

# restart
Restart-NetAdapter -Name 'Ethernet 3'

Test-NetConnection
```

# SSH
```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'

Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

Start-Service sshd  
Set-Service -Name sshd -StartupType 'Automatic'  

# connect
ssh htb-student@10.129.224.248
```

# WinRM
It listens on logical ports `5985` & `5986`
```powershell
winrm quickconfig

# test unauthenticated access
Test-WSMan -ComputerName "10.129.224.248"

# authed access
Test-WSMan -ComputerName "10.129.224.248" -Authentication Negotiate
```
# PowerShell Remote Sessions
```powershell
# from windows
Enter-PSSession -ComputerName 10.129.224.248 -Credential htb-student -Authentication Negotiate

# form linux
# the same - just install powershell
```
# Web requests
```powershell
Invoke-WebRequest -Uri "https://web.ics.purdue.edu/~gchopra/class/public/pages/webdesign/05_simple.html" -Method GET | Get-Member

Invoke-WebRequest -Uri "https://web.ics.purdue.edu/~gchopra/class/public/pages/webdesign/05_simple.html" -Method GET | fl Images

Invoke-WebRequest -Uri "https://web.ics.purdue.edu/~gchopra/class/public/pages/webdesign/05_simple.html" -Method GET | fl RawContent

Invoke-WebRequest -Uri "https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Recon/PowerView.ps1" -OutFile "C:\PowerView.ps1"

(New-Object Net.WebClient).DownloadFile("https://github.com/BloodHoundAD/BloodHound/releases/download/4.2.0/BloodHound-win32-x64.zip", "Bloodhound.zip")
```


