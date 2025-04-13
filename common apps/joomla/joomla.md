#cms 
# Footprint
```bash
curl -s http://dev.inlanefreight.local/ | grep Joomla
```
or check robot.ts as in [[joomla robots.txt]] 
# Detect version
```bash
curl -s http://dev.devvortex.htb/administrator/manifests/files/joomla.xml|grep 'version>'

curl -s http://dev.inlanefreight.local/README.txt | head -n 5

curl -s http://dev.inlanefreight.local/administrator/manifests/files/joomla.xml | xmllint --format -
```
The cache.xml file can help to give us the approximate version. It is located at plugins/system/cache/cache.xml.
# Enumeration
https://github.com/droope/droopescan
```bash
sudo pip3 install droopescan
droopescan scan joomla --url http://dev.inlanefreight.local/
```

https://github.com/drego85/JoomlaScan
```bash
git clone https://github.com/drego85/JoomlaScan && cd JoomlaScan
sudo python2.7 -m pip install urllib3 certifi bs4
python2.7 joomlascan.py -u http://dev.inlanefreight.local
```

login brutforce
```bash
git clone https://github.com/ajnik/joomla-bruteforce && cd joomla-bruteforce

python3 joomla-brute.py -u http://dev.inlanefreight.local -w /usr/share/metasploit-framework/data/wordlists/http_default_pass.txt -usr admin
 
admin:admin
```