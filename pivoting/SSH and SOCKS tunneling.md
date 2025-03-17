#proxychains 
# Local port forwarding
```bash
attacker$ nmap -sT -p22,3306 10.129.202.64

22/tcp   open   ssh
3306/tcp closed mysql
```
Access MySQL locally on 22 port
```shell
attacker$ ssh -L 1234:localhost:3306 ubuntu@10.129.202.64
```
Ensure it works
```bash
netstat -antp | grep 1234
# or 
nmap -v -sV -p1234 localhost
```
Forward multiple ports
```bash
ssh -L 1234:localhost:3306 -L 8080:localhost:80 ubuntu@10.129.202.64
```
# Setting up a Pivot
Find out Ubuntu's internal network:
```ifconfig
ens224: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.16.5.129  netmask 255.255.254.0  broadcast 172.16.5.255
```
## Dynamic port forwarding
```bash
ssh -D 9050 ubuntu@10.129.202.64

tail -4 /etc/proxychains.conf
socks4 	127.0.0.1 9050

# only full TCP scan available
proxychains nmap -v -sn 172.16.5.1-200
proxychains nmap -v -Pn -sT 172.16.5.19
```
