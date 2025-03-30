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

# get clipboarc content
Get-Clipboard
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
```

# Files and Directories
```powershell

# retrieve an object (file, folder, registry object, etc.)
Get-Item
gi

# list items of folder or registry hive
Get-ChildItem
Get-ChildItem -Hidden # include hidden files
get-childitem -Path *.txt
ls
dir
gci

# create an object (file, folder, symlink, registry entry, etc.)
# file by default
New-Item
new-item -name "SOPs" -type directory
md
mkdir
ni

# modify properties
Set-Item
si

Copy-Item
cp
copy
ci

Rename-Item
rename-item -NewName {$_.name -replace ".txt",".md"} 
ren
rni

Remove-Item
rm
del
rmdir

Get-Content
cat
type

Add-Content
ac

Set-Content
sc

Clear-Content
clc

Compare-Object
diff
compare
```
# Objects and Classes
```powershell
# get class definition of user object
Get-LocalUser administrator | get-member

# select all properties
Get-LocalUser administrator | Select-Object -Property *

# filter on properties
Get-LocalUser * | Select-Object -Property Name,PasswordLastSet
Get-LocalUser * | Sort-Object -Property Name | Group-Object -property Enabled

get-service | Select-Object -Property DisplayName,Name,Status | Sort-Object DisplayName | fl 

# grep by property value
# -contains
# -equal
# -match
# -not
Get-Service | where DisplayName -like '*Defender*'
# alias
Get-Service | where-object DisplayName -like '*Defender*'
# display all properties
Get-Service | where DisplayName -like '*Defender*' | Select-Object -Property *
```

# Pipelines
Like in bash:
```powershell
get-process | sort | unique | measure-object

Get-Content '.\test.txt' && ping 8.8.8.8

Get-Content '.\test.txt' || ping 8.8.8.8
```
# Find
```powershell
# recursive search for a .txt files
Get-Childitem –Path C:\Users\MTanaka\ -File -Recurse -ErrorAction SilentlyContinue | where {($_.Name -like "*.txt")}

# recursive search for .txt|py|ps1|md|csv files
Get-Childitem –Path C:\Users\MTanaka\ -File -Recurse -ErrorAction SilentlyContinue | where {($_.Name -like "*.txt" -or $_.Name -like "*.py" -or $_.Name -like "*.ps1" -or $_.Name -like "*.md" -or $_.Name -like "*.csv")}

# search for files and grep lines in their content
Get-ChildItem -Path C:\Users\MTanaka\ -Filter "*.txt" -Recurse -File | sls "Password","credential","key"
```
# Run command on local or remotes machine(s)
```powershell
invoke-command -ComputerName ACADEMY-ICL-DC,LOCALHOST -ScriptBlock {Get-Service -Name 'windefend'}

tatus   Name               DisplayName                            PSComputerName
------   ----               -----------                            --------------
Running  windefend          Microsoft Defender Antivirus Service   LOCALHOST
Running  windefend          Windows Defender Antivirus Service     ACADEMY-ICL-DC
 ```
# Scripting
Extensions:
* ps1 - script
* psm1 - module
* psd1 - powershell data
#### Module Components
1. Directory with scripts and resources within `$env:PSModulePath`
2. Manifest is a simple .psd1 file
#### Manifest
```powershell
New-ModuleManifest -Path C:\Users\MTanaka\Documents\WindowsPowerShell\Modules\quick-recon\quick-recon.psd1 -PassThru
```
Manifest example:
```psd1
# Module manifest for module 'quick-recon'
#
# Generated by: MTanaka
#
# Generated on: 10/31/2022
#

@{

# Script module or binary module file associated with this manifest.
# RootModule = 'C:\Users\MTanaka\WindowsPowerShell\Modules\quick-recon\quick-recon.psm1'

# Version number of this module.
ModuleVersion = '1.0'

# ID used to uniquely identify this module
GUID = '0a062bb1-8a1b-4bdb-86ed-5adbe1071d2f'

# Author of this module
Author = 'MTanaka'

# Company or vendor of this module
CompanyName = 'Greenhorn.Corp.'

# Copyright statement for this module
Copyright = '(c) 2022 Greenhorn.Corp. All rights reserved.'

# Description of the functionality provided by this module
Description = 'This module will perform several quick checks against the host for Reconnaissance of key information.'

# Functions to export from this module, for best performance, do not use wildcards and do not delete the entry, use an empty array if there are no functions to export.
FunctionsToExport = @()

# Cmdlets to export from this module, for best performance, do not use wildcards and do not delete the entry, use an empty array if there are no cmdlets to export.
CmdletsToExport = @()

# Variables to export from this module
VariablesToExport = '*'

# Aliases to export from this module, for best performance, do not use wildcards and do not delete the entry, use an empty array if there are no aliases to export.
AliasesToExport = @()

# List of all modules packaged with this module
# ModuleList = @()

# List of all files packaged with this module
# FileList = @()  
}
```
#### Create script
```powershell
C:\Users\MTanaka\Documents\WindowsPowerShell\Modules\quick-recon\quick-recon.psm1 -ItemType File
```
Example:
```powershell
Import-Module ActiveDirectory
<#
multi
line
comment
module help should be also here
#>
function Get-Recon {  
    $Hostname = $env:ComputerName  
    $IP = ipconfig
    $Domain = Get-ADDomain 
    $Users = Get-ChildItem C:\Users\
    new-Item ~\Desktop\recon.txt -ItemType File 
    $Vars = "***---Hostname info---***", $Hostname, "***---Domain Info---***", $Domain, "***---IP INFO---***",  $IP, "***---USERS---***", $Users
    Add-Content ~\Desktop\recon.txt $Vars
} 
Export-ModuleMember -Function Get-Recon -Variable Hostname 
```

