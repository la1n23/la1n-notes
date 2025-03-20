# Ports
Default is UDP/53, fallbacks to TCP/53
# DNS lookup
```bash
dig -x 8.8.4.4 +short
cat ips.txt | dnsx -ptr -resp-only

nslookup <server ip> <dns server ip>
```
# DNS Zone Transfer
#### Find subdomains:
```shell
dig axfr ns.inlanefreight.htb @10.129.14.128
```
#### Enumerate all DNS servers and scan for zone transfers
https://github.com/mschwager/fierce
NGINX 1.18.0```bash
python -m pip install fierce

fierce --domain zonetransfer.me
Subdomain Brute Forcing
[[Virtual hosts]]
https://github.com/aboul3la/Sublist3r

```shell
dnsenum --dnsserver 10.129.14.128 --enum -p 0 -s 0 -o subdomains.txt -f /opt/useful/seclists/Discovery/DNS/subdomains-top1million-110000.txt inlanefreight.htb
```
# Get IPs by domain:
```shell
dig +short hackthebox.com

104.18.20.126
104.18.21.126
```
# Domain Takeover
`Domain takeover` is registering a non-existent domain name to gain control over another domain

Domain takeover is also possible with subdomains called subdomain takeover. A DNS's canonical name (CNAME) record is used to map different domains to a parent domain. Many organizations use third-party services like AWS, GitHub, Akamai, Fastly, and other content delivery networks (CDNs) to host their content. In this case, they usually create a subdomain and make it point to those services. For example,
```dns
sub.target.com.   60   IN   CNAME   anotherdomain.com
```
#### Tool
https://github.com/EdOverflow/can-i-take-over-xyz
# Enumerate subdomains
https://github.com/projectdiscovery/subfinder
https://dnsdumpster.com/
```bash
./subfinder -d inlanefreight.com -v   
```
#### Subbrute - find all DNS records for domain
```bash
git clone https://github.com/TheRook/subbrute.git >> /dev/null 2>&1
cd subbrute
echo "ns1.inlanefreight.com" > ./resolvers.txt
./subbrute.py inlanefreight.com -s ./names.txt -r ./resolvers.txt

Warning: Fewer than 16 resolvers per process, consider adding more nameservers to resolvers.txt.
inlanefreight.com
ns2.inlanefreight.com
www.inlanefreight.com
ms1.inlanefreight.com
support.inlanefreight.com

<SNIP>
```
# DNS Spoofing
DNS spoofing is also referred to as DNS Cache Poisoning.
An attacker could intercept the communication between a user and a DNS server to route the user to a fraudulent destination instead of a legitimate one by performing a Man-in-the-Middle (#) attack.
#### Local DNS Cache Poisoning 
#MITM
[Ettercap](https://www.ettercap-project.org/) or [Bettercap](https://www.bettercap.org/).
```bash
cat /etc/ettercap/etter.dns

inlanefreight.com      A   192.168.225.110
*.inlanefreight.com    A   192.168.225.110
```
Link with images: https://academy.hackthebox.com/module/116/section/1512
