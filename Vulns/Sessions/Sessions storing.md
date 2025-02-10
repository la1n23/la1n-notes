#sessions
#### PHP
#php
```bash
locate php.ini
cat /etc/php/7.4/cli/php.ini | grep 'session.save_path'
cat /etc/php/7.4/apache2/php.ini | grep 'session.save_path'
```

```bash
/var/lib/php/sessions/sess_*
```

#### Java
#java
```bash
locate SESSIONS.ser
```
https://tomcat.apache.org/tomcat-6.0-doc/config/manager.html
[[tomcat]]
#### .NET
#asp
https://www.c-sharpcorner.com/UploadFile/225740/introduction-of-session-in-Asp-Net/
* The application worker process (aspnet_wp.exe) - This is the case in the InProc Session mode
* StateServer (A Windows Service residing on IIS or a separate server) - This is the case in the OutProc Session mode
* An SQL Server

