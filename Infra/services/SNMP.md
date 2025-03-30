# Simple Network Management Protocol
#### Enumerate emails
```shell
snmpwalk -v2c -c public <ip> | tee SNMPWalk.txt
```
##### Footprinting
```shell
onesixtyone -c /usr/share/wordlists/seclists/Discovery/SNMP/snmp-onesixtyone.txt 10.129.173.244
```
Query OIDS
```shell
snmpwalk -v2c -c backup STMIP
```