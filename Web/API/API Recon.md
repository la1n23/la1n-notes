[[Recon]]
# Dorking
```
inurl:"/wp-json/wp/v2/users"
intitle:"index.of" intext:"api.txt"
inurl:"/api/v1" intext:"index of /"
intitle:"index of" api_key OR "api key" OR apiKey -pool
allintext:"API_SECRET*" ext:env | ext:yml
intitle:"Index of /api/"

# github
filename:swagger.json
extension: .json
shodan_api_key
"Authorization: Bearer"
path:/config/
path:/secrets/
path:/keys/
path:/private/
path:/deploy/
language:json
language:yaml
language:python
language:javascript
language:ruby
extension:yml
extension:json
extension:xml
extension:cfg
extension:config
user:username
org:organization
size:>1000 (Files larger than 1 KB)
size:<500 (Files smaller than 500 bytes)
fork:true
stars:>100
created:2022-01-01..2022-12-31
pushed:2022-01-01..2022-12-31
updated:2022-01-01..2022-12-31
license:mit
license:apache-2.0
in:file (Search within file content)
in:readme (Search within README files)
in:description (Search within repository descriptions)
*api* (Matches any repository with "api" in its name)
user:*api* (Matches repository with "api" in the username
"api key", "api keys", "apikey", "access_token", "authorization:
Bearer", "secret", "token"

```
# Trufflehog
Search for public secrets in Git, Gitlab, Amazon S3, filesystem, and Syslog
```bash
# venmo - name of target organization
trufflehog github --org=venmo  --no-update
```
# Shodan
```
hostname:"targetname.com"
"content-type: application/json"
"content-type: application/xml"
"200 OK"
"wp-json"
```
# Amass
```bash
# if you hape censys API key, add it to config file
curl https://raw.githubusercontent.com/OWASP/Amass/master/examples/config.yaml >~/.config/amass/config.yaml

# supported list of data sources
amass enum -list 

amass enum -active -d target-name.com |grep api

# find domain names 
amass intel -addr [target IP addresses]

amass intel -d [target domain] –whois

amass enum -passive -d [target domain]
# The active enum scan will perform much of the same scan as the passive one, but it will add domain name resolution, attempt DNS zone transfers, and grab SSL certificate information:
amass enum -active -d [target domain]

# brute force subdomains
amass enum -active -brute -w /usr/share/wordlists/API_superlist -d [target domain] -dir [directory name] 

gobuster dir -u http://targetaddress/ -w /usr/share/wordlists/api_list/common_apis_160 -x 200,202,301 -b 302
```
# API Revere engineering
1. Postman - capture requests
2. mitmproxy

```bash
pip install mitmproxy
mitmweb

nix-env -f '<nixpkgs>' -iA mitmproxy2swagger

mitmproxy2swagger -i ~/flows_file_from_mitm -o spec.yml -p http://crapi.apisec.ai -f flow
# inspect spec.yml file and remove ignore: in api endpoints 
# run again
mitmproxy2swagger -i ~/flows_file_from_mitm -o spec.yml -p http://crapi.apisec.ai -f flow --examples
```

# Scan with API
Add auth header to ZAP which needed for API scanning
https://blog.haicen.me/posts/zap-custom-headers/