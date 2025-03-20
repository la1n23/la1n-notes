#enumeration
##### Version - Source code
```bash
curl -s -X GET http://blog.inlanefreight.com | grep '<meta name="generator"'

<meta name="generator" content="WordPress 5.3.3" />
```
##### Version - JS
```html
<script type='text/javascript' src='http://blog.inlanefreight.com/wp-content/plugins/mail-masta/lib/jquery.validationEngine.js?ver=5.3.3'></script>
```
##### Version - CSS
```html
<link rel='stylesheet' id='smartmenus-css'  href='http://blog.inlanefreight.com/wp-content/themes/ben_theme/css/jquery.smartmenus.bootstrap.css?ver=5.3.3' type='text/css' media='all' />
```
##### Plugins
```bash
curl -s -X GET http://blog.inlanefreight.com | sed 's/href=/\n/g' | sed 's/src=/\n/g' | grep 'wp-content/plugins/*' | cut -d"'" -f2

curl -s http://blog.inlanefreight.local/ | grep plugins
```

```bash
curl -I -X GET http://blog.inlanefreight.com/wp-content/plugins/mail-masta
```
**Deactivated plugins are still accessible**:
```bash
curl -s -X GET http://blog.inlanefreight.com/wp-content/plugins/mail-masta/ | html2text
```
##### Themes
```bash
curl -s -X GET http://blog.inlanefreight.com | sed 's/href=/\n/g' | sed 's/src=/\n/g' | grep 'themes' | cut -d"'" -f2

curl -s http://blog.inlanefreight.local/ | grep themes
```
### User enumeration
```bash
curl -s -I http://blog.inlanefreight.com/?author=1
```
301 if found. Using WP API:
```bash
curl http://blog.inlanefreight.com/wp-json/wp/v2/users | jq
```
##### Login
```bash
curl -X POST -d "<methodCall><methodName>wp.getUsersBlogs</methodName><params><param><value>admin</value></param><param><value>CORRECT-PASSWORD</value></param></params></methodCall>" http://blog.inlanefreight.com/xmlrpc.php
```
##### List all available API methods
```bash
curl -X POST -d '<methodCall><methodName>system.listMethods</methodName><params></params></methodCall>' http://blob/inlanefreight.com/xmlrpc.php
```
##### Enumerate index directories
```bash
gobuster dir -u http://blog.inlanefreight.local/wp-content/ -w /usr/share/wordlists/metasploit/wp-plugins.txt -k -t 50 -q
```
or
```bash
wpscan --url http://blog.inlanefreight.local -e vp --no-banner --detection-mode aggressive
```
