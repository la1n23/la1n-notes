#### Crack a hash
```bash
 hashcat -m 1710 -a 0 -o cracked.txt h.txt /usr/share/wordlists/rockyou.txt
```


If you know salt, specify it in h.txt:
`hashcontent:salt` or `salt:hashcontent`

Example format for bruteforcding gitea:
https://gist.github.com/h4rithd/0c5da36a0274904cafb84871cf14e271