#windows/logs
# Event categories
* System Log
* Security Log
* Application Log
* Setup Log - generated when OS is installed or AD, events related to AD 
* Forwarded Events - from other hosts
# Event types
* Error
* Warning
* Information
* Success Audit - such as when a user logs on to a system
* Failure Audit - e.g. user failed logs on
# Event Severity Levels
| Severity Level | Level # | Description                                                                                                                                                                                    |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Verbose        | 5       | Progress or success messages.                                                                                                                                                                  |
| Information    | 4       | An event that occurred on the system but did not cause any issues.                                                                                                                             |
| Warning        | 3       | A potential problem that a sysadmin should dig into.                                                                                                                                           |
| Error          | 2       | An issue related to the system or service that does not require immediate attention.                                                                                                           |
| Critical       | 1       | This indicates a significant issue related to an application or a system that requires urgent attention by a sysadmin that, if not addressed, could lead to system or application instability. |
# Elements of an Event Log
* Log Name
* Event date/time
* Task Category
* Event ID
* Source - typically the name of a programm
* Level - severity
* User
* Computer

# Service
Event Log - Windows Event Log -  svchost.exe
```powershell
ls C:\Windows\System32\winevt\logs

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        11/16/2022   2:19 PM        7409664 Application.evtx
-a----         6/14/2022   8:20 PM          69632 HardwareEvents.evtx
```

# wevtutil
```cmd
wevtutil /?

:: enumerate name of all logs
wevtutil el

:: show configuration for specific log
wevtutil gl "Windows PowerShell"

name: Windows PowerShell
enabled: true
type: Admin
owningPublisher:
isolation: Application
channelAccess: O:BAG:SYD:(A;;0x2;;;S-1-15-2-1)(A;;0x2;;;S-1-15-3-1024-3153509613-960666767-3724611135-2725662640-12138253-543910227-1950414635-4190290187)(A;;0xf0007;;;SY)(A;;0x7;;;BA)(A;;0x7;;;SO)(A;;0x3;;;IU)(A;;0x3;;;SU)(A;;0x3;;;S-1-5-3)(A;;0x3;;;S-1-5-33)(A;;0x1;;;S-1-5-32-573)
logging:
  logFileName: %SystemRoot%\System32\Winevt\Logs\Windows PowerShell.evtx
  retention: false
  autoBackup: false
  maxSize: 15728640
publishing:
  fileMax: 1

:: status info such as creation time, last access, write tiems, etc.
wevtutil gli "Windows PowerShell"

creationTime: 2020-10-06T16:57:38.617Z
lastAccessTime: 2022-10-26T19:05:21.533Z
lastWriteTime: 2022-10-26T19:05:21.533Z
fileSize: 11603968
attributes: 32
numberOfLogRecords: 9496
oldestRecordNumber: 1

:: query events
wevtutil qe Security /c:5 /rd:true /f:text

:: export events
wevtutil epl System C:\system_export.evtx
```
# powershell
```powershell
# list all logs
Get-WinEvent -ListLog *

# list by category
Get-WinEvent -ListLog Security

# querying last 5
Get-WinEvent -LogName 'Security' -MaxEvents 5 | Select-Object -ExpandProperty Message

# Filtering for Logon Failures
Get-WinEvent -FilterHashTable @{LogName='Security';ID='4625 '}

# by level
Get-WinEvent -FilterHashTable @{LogName='System';Level='1'} | select-object -ExpandProperty Message


