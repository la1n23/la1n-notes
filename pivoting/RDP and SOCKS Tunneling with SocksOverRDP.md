
https://github.com/nccgroup/SocksOverRDP/releases
https://www.proxifier.com/download/#win-tab - `ProxifierPE.zip`

```cmd
C:\Users\htb-student\Desktop\SocksOverRDP-x64> regsvr32.exe SocksOverRDP-Plugin.dll
```

connect via rdp to target host
```cmd
mstsc.exe
```
specify ip  172.16.5.19 and login/pwd

We will need to transfer SocksOverRDPx64.zip or just the SocksOverRDP-Server.exe to 172.16.5.19. We can then start SocksOverRDP-Server.exe with Admin privileges.

```cmd
C:\Users\htb-student\Desktop\SocksOverRDP-x64> netstat -antb | findstr 1080

  TCP    127.0.0.1:1080         0.0.0.0:0              LISTENING
  ```

#### Configuring Proxifier