# Identify hash
```bash
pip install hashid

hashid '$apr1$71850310$gh9m4xcAn3MGxogwX/ztb.'
hashid hashes.txt

# show mode for hashcat
hashid '$apr1$71850310$gh9m4xcAn3MGxogwX/ztb.' -m
```
After getting a few suggestions, check hash examples to find the right one:
#### Hash examples table
https://hashcat.net/wiki/doku.php?id=example_hashes
or
```bash
hashcat --example-hashes | less
```
or narrow possible variants:
```bash
hash-identifier '0c352d5b2f45217c57bef9f8452ce376'
```
# Crack a hash
#### Dictionary Attack
```bash
# -a 0 - dictionary
# -a 1 - combination of a few wordlists
# -a 3 - brute-force
# -a 6 - hybrid wordlist + mask
# -a 7 - hybrid mask + wordlist
hashcat -m 1710 -a 0 -o cracked.txt h.txt /usr/share/wordlists/rockyou.txt
```
#### Combination attack
#### Optimization
* -0 - Enable optimized kernels (limits password length) recommende to run first enabled
* -w - Workload. 1 - if you want to use your computer during cracking, 2 - default, 3 - full load
#### Password generation rules
```bash
hashcat --force password.list -r custom.rule --stdout | sort -u > mut_password.list
```

```bash
ls /usr/share/hashcat/rules/
```
Rules from HTB:
https://academy.hackthebox.com/storage/resources/Password-Attacks.zip
# Large passwords wordlist
https://crackstation.net/crackstation-wordlist-password-cracking-dictionary.htm
# Examples
If you know salt, specify it in h.txt:
`hashcontent:salt` or `salt:hashcontent`
#### Bruteforce sha256 by mask
```bash
hashcat susan.hash -a 3 -m 1400 susan_nasus_?d?d?d?d?d?d?d?d?d  
```
##### Example format for bruteforcfing gitea:
https://gist.github.com/h4rithd/0c5da36a0274904cafb84871cf14e271