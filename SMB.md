
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


## Enum4linux