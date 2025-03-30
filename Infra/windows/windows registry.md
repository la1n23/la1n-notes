#windows/registry
# Hives
| **Name**            | **Abbreviation** | **Description**                                                                                                                                                                                                                                                                                                          |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| HKEY_LOCAL_MACHINE  | `HKLM`           | This subtree contains information about the computer's `physical state`, such as hardware and operating system data, bus types, memory, device drivers, and more.                                                                                                                                                        |
| HKEY_CURRENT_CONFIG | `HKCC`           | This section contains records for the host's `current hardware profile`. (shows the variance between current and default setups) Think of this as a redirection of the [HKLM](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2003/cc739525\(v=ws.10\)) CurrentControlSet profile key. |
| HKEY_CLASSES_ROOT   | `HKCR`           | Filetype information, UI extensions, and backward compatibility settings are defined here.                                                                                                                                                                                                                               |
| HKEY_CURRENT_USER   | `HKCU`           | Value entries here define the specific OS and software settings for each specific user. `Roaming profile` settings, including user preferences, are stored under HKCU.                                                                                                                                                   |
| HKEY_USERS          | `HKU`            | The `default` User profile and current user configuration settings for the local computer are defined under HKU.                                                                                                                                                                                                         |

```powershell
Get-Item -Path Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run | Select-Object -ExpandProperty Property  

Get-ChildItem -Path HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion -Recurse

Get-ItemProperty -Path Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run

reg query HKEY_LOCAL_MACHINE\SOFTWARE\7-Zip

# HKCU - portion of path to search in
# /f - pattern for search
# /t - type, not specified - all types
# /s - all subkeys recursivly
# /k - do not search through keys
REG QUERY HKCU /F "Password" /t REG_SZ /S /K

# new key
New-Item -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce\ -Name TestKey

# set property
New-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce\TestKey -Name  "access" -PropertyType String -Value "C:\Users\htb-student\Downloads\payload.exe"

# via reg.exe
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\RunOnce\TestKey" /v access /t REG_SZ /d "C:\Users\htb-student\Downloads\payload.exe"  

# remove reg property
Remove-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce\TestKey -Name  "access"
```
