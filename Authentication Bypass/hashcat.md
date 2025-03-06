#### Crack a hash
```bash
 hashcat -m 1710 -a 0 -o cracked.txt h.txt /usr/share/wordlists/rockyou.txt
```


If you know salt, specify it in h.txt:
`hashcontent:salt` or `salt:hashcontent`

Example format for bruteforcding gitea:
https://gist.github.com/h4rithd/0c5da36a0274904cafb84871cf14e271

#### Password generation rules
```bash
hashcat --force password.list -r custom.rule --stdout | sort -u > mut_password.list
```

```bash
ls /usr/share/hashcat/rules/
```

