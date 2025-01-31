![[nmap scan steps.png]]

Nmap scan goes through the steps above

![[layers.png]]


#### Usage:

* Scan list of hosts
```shell
nmap -iL list_of_hosts.txt
```
* ARP scan local network without port scanning
````shell-session
nmap -PR -sn 10.10.210.6/24
````
* using arp-scan utility
```shell
arp-scan 10.10.210.6/24
```
* ICMP echo requests
```shell
nmap -PE -sn 10.10.68.220/24
```
* ICMP timestamps
```shell
nmap -PP -sn 10.10.68.220/24
```
![[nmap options.png]]

* TCP SYN Ping - `nmap -PS -sn 10.10.68.220/24`
* TCP ACK Ping - `nmap -PA -sn 10.10.68.220/24`
* UDP Ping - `nmap -PU -sn 10.10.68.220/24`
* masscan utility
* To skip DNS - `-n`
* to query the DNS server even for offline hosts - `-R`
*

![[summarize.png]]