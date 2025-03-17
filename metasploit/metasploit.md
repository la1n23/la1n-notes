# Metasploit with #proxychains
```bash
proxychains msfconsole
```

```msf
msf6 > search rdp_scanner
msf6 > use 0
msf6 auxiliary(scanner/rdp/rdp_scanner) > set rhosts 172.16.5.19
rhosts => 172.16.5.19
msf6 auxiliary(scanner/rdp/rdp_scanner) > run
```