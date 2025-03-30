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
#### Previously cracked passwords
```bash
cut -d: -f 2- ~/hashcat.potfile
```
#### Dictionary Attack
```bash
# -a 0 - dictionary
# -a 1 - combination of a few wordlists
# -a 3 - brute-force
# -a 6 - hybrid: wordlist + mask
# -a 7 - hybrid: mask + wordlist
hashcat -m 1710 -a 0 -o cracked.txt h.txt /usr/share/wordlists/rockyou.txt
```
#### Combination attack
```bash
hashcat -a 1 -m <hash type> <hash file> <wordlist1> <wordlist2>
# just generate wordlist 
hashcat -a 1 --stdout file1 file2
```
#### Mask attack
```bash
# ?! - a-z
# ?u - A-Z
# ?d - 0-9
# ?h - 0123456789abcdef
# ?H - 0123456789ABCDEF
# ?s - special - («space»!"#$%&'()*+,-./:;<=>?@[]^_`{
# ?a - ?!?u?d?s
# ?b - 0x00 - 0xff
# https://hashcat.net/wiki/doku.php?id=mask_attack
# ?1 - --custom-charset1=asdf  or -1 asdf
# ?2 - --custom-charset2=qwert or -2 qwert
# ?3 - --custom-charset3=234   or -3 234
# ?4 - --custom-charset4=987   or -4 987
hashcat hash.txt -a 3 -m 0 -1 01 'HASHCAT?l?l?l?l?l20?1?d'
hashcat -a 3 -m 0 '50a742905949102c961929823a2e8ca0' -1 02 'HASHCAT?l?l?l?l?l20?1?d'
```
The "--increment" flag can be used to increment the mask length automatically, with a length limit that can be supplied using the "--increment-max" flag.
#### Hybrid attack
```bash
# append mask to password from wordlist
hashcat -a 6 -m 0 hybrid_hash_prefix -1 01 rockyou.txt '20?1?d'
# prepend mask to password from wordlist
hashcat -a 7 -m 0 hybrid_hash_prefix -1 01 rockyou.txt '20?1?d'
```

#### Optimization
* -0 - Enable optimized kernels (limits password length) recommende to run first enabled
* -w - Workload. 1 - if you want to use your computer during cracking, 2 - default, 3 - full load
```bash
```
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
## Hashcat-utils
https://github.com/hashcat/hashcat-utils
```bash
# maskprocessor
/mp64.bin Welcome?s
Welcome 
Welcome!
Welcome"
Welcome#
Welcome$
Welcome%
Welcome&
Welcome'
Welcome(
Welcome)
Welcome*
Welcome+

<SNIP>
```