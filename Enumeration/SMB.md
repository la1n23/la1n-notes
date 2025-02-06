#### Alternative to smbclient
```bash
git clone https://github.com/SecureAuthCorp/impacket.git
...
python psexec.py username:password@hostIP
```

#### SMBclient
```bash
smbmap -H 10.10.216.209
```

```bash
smbclient //10.10.216.209/anonymous
```

```
get logs/log1.txt
put local.txt
```

```bash
smbclient -U milesdyson //10.10.216.209/milesdyson
```

list shared folders:
```
smbclient -L \\\\10.10.18.79
```

connect and download:
```
λ kali ~ → smbclient  \\\\10.10.18.79\\Users
Password for [WORKGROUP\root]:
Try "help" to get a list of possible commands.
smb: \> get gakeeper.exe
```

footprint samba
```shell-session
sudo nmap 10.129.14.128 -sV -sC -p139,445
```


#### RPCclient - Enumeration

```shell-session
user@htb[/htb]$ rpcclient -U "" 10.129.14.128
```

|                           |                                                                    |
| ------------------------- | ------------------------------------------------------------------ |
| `srvinfo`                 | Server information.                                                |
| `enumdomains`             | Enumerate all domains that are deployed in the network.            |
| `querydominfo`            | Provides domain, server, and user information of deployed domains. |
| `netshareenumall`         | Enumerates all available shares.                                   |
| `netsharegetinfo <share>` | Provides information about a specific share.                       |
| `enumdomusers`            | Enumerates all domain users.                                       |
| `queryuser <RID>`         | Provides information about a specific user.                        |
| querygroup<br>            |                                                                    |
|                           |                                                                    |
|                           |                                                                    |

#### Brute Forcing User RIDs
```
user@htb[/htb]$ for i in $(seq 500 1100);do rpcclient -N -U "" 10.129.14.128 -c "queryuser 0x$(printf '%x\n' $i)" | grep "User Name\|user_rid\|group_rid" && echo "";done
```

alternative - https://github.com/SecureAuthCorp/impacket [samrdump.py](https://github.com/SecureAuthCorp/impacket/blob/master/examples/samrdump.py).

https://github.com/ShawnDEvans/smbmap

https://github.com/byt3bl33d3r/CrackMapExec

https://github.com/cddmp/enum4linux-ng

```shell-session
 ./enum4linux-ng.py 10.129.14.128 -A
```