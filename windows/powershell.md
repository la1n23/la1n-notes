#windows/powershell
```powershell
Get-Help Test-Wsman
# show help in browser
Get-Help Test-Wsman -online

# pwd
Get-Location

# ls
Get-ChildItem

# cd
Set-Location .\Documents

# cat
Get-Content Readme.md

# find command by verb in its name
Get-Command -verb get

# find command by noun in its namee
Get-Command -noung window*

# get last commands
Get-History

# history location
get-content C:\Users\DLarusso\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt

# clear
Clear-Host

# aliases
Get-Alias
Set-Alias -Name gh -Value Get-Help
```
# Modules
```powershell
Get-Module -ListAvailable 

Import-Module .\PowerSploit.psd1

Get-ExecutionPolicy 

# set no limits globally
Set-ExecutionPolicy undefined 

# in scope
Set-ExecutionPolicy -scope Process
Get-ExecutionPolicy -list

# calling cmdlets and function within a module
Get-Command -Module PowerSploit
```
#### Modules repo
https://www.powershellgallery.com/
```powershell
# interacting with powershellgallery
Get-Command -Module PowerShellGet 
# install
Find-Module -Name AdminToolbox | Install-module
```
* **AdminToolbox**: is a collection of helpful modules that allow system administrators to perform any number of actions dealing with things like Active Directory, Exchange, Network management, file and storage issues, and more.
* **ActiveDirectory**: This module is a collection of local and remote administration tools for all things Active Directory. We can manage users, groups, permissions, and much more with it.
* **Empire / Situational Awareness**: Is a collection of PowerShell modules and scripts that can provide us with situational awareness on a host and the domain they are apart of. This project is being maintained by BC Security as a part of their Empire Framework.
* **Inveigh**: Inveigh is a tool built to perform network spoofing and Man-in-the-middle attacks.
* **BloodHound** / **SharpHound**: allows us to visually map out an Active Directory Environment using graphical analysis tools and data collectors written in C# and PowerShell.

# User and Group Management
### Built-In Accounts
* Administrator
* Default Account
* Guest Account
* WDAGUtility Account - for the Defender Application Guard, which can sandbox application sessions.

```powershell
# list groups
get-localgroup

# list users
Get-LocalUser

# new user
New-LocalUser -Name "JLawrence" -NoPassword

# modify user
$Password = Read-Host -AsSecureString
Set-LocalUser -Name "JLawrence" -Password $Password -Description "CEO EagleFang"

# list users of specific group "Users"
Get-LocalGroupMember -Name "Users"

# add to group
Add-LocalGroupMember -Group "Remote Desktop Users" -Member "JLawrence"

```
### AD
```powershell
# Remote System Administration Tools - ActiveDirectory Module
Get-WindowsCapability -Name RSAT* -Online | Add-WindowsCapability -Online

# Check module is installed
Get-Module -Name ActiveDirectory -ListAvailable 

# import module before usage
Import-Module ActiveDirectory 

# list all users
Get-ADUser -Filter *

# get specific user
Get-ADUser -Filter {GivenName -like 'robert'} 
Get-ADUser -Identity TSilver

DistinguishedName : CN=TSilver,CN=Users,DC=greenhorn,DC=corp
Enabled           : True
GivenName         :
Name              : TSilver
ObjectClass       : user
ObjectGUID        : a19a6c8a-000a-4cbf-aa14-0c7fca643c37
SamAccountName    : TSilver
SID               : S-1-5-21-1480833693-1324064541-2711030367-1602
Surname           :
UserPrincipalName :

# search on an attribute
Get-ADUser -Filter {EmailAddress -like '*greenhorn.corp'}

# new user
New-ADUser -Name "MTanaka" -Surname "Tanaka" -GivenName "Mori" -Office "Security" -OtherAttributes @{'title'="Sensei";'mail'="MTanaka@greenhorn.corp"} -Accountpassword (Read-Host -AsSecureString "AccountPassword") -Enabled $true 

# user properties
Get-ADUser -Identity MTanaka -Properties *
Set-ADUser -Identity MTanaka -Description " Sensei to Security Analyst's Rocky, Colt, and Tum-Tum"  


