projectdiscovery.io
https://crt.sh/

wordlist
https://wordlists.assetnote.io/
https://github.com/six2dez/OneListForAll


paid:
securitytrails
hackertarget

https://dnsdumpster.com/
https://wordlists.assetnote.io/
https://gist.githubusercontent.com/mordka/c65affdefccb7264efff77b836b5e717/raw/e65646a07849665b28a7ee641e5846a1a6a4a758/colors-list.txt

assetfinder -subs-only ishosting.com > assetfinder.txt

For quick scan:
```bash
subfinder -d ishosting.com -o subfinder.txt -all
subfinder -dl domainlist.txt -o subfinder.txt -all
```

https://github.com/Dheerajmadhukar/4-ZERO-3/blob/main/403-bypass.sh

domain takeover checker
https://github.com/PentestPad/subzy

openredirect checker
https://github.com/devanshbatham/OpenRedireX

virustotal
get api key https://www.virustotal.com/gui/my-apikey
```bash
curl --request GET --url https://www.virustotal.com/api/v3/domains/example.com --header 'accept: application/json' --header 'X-Apikey: key'|jq
```

Long and heavy scan:
[[amass]]

amass alternative
```
git clone https://github.com/blacklanternsecurity/bbot && cd bbot
./bbot-docker.sh --help

docker run -d -p 7687:7687 -p 7474:7474 -v "$(pwd)/neo4j/:/data/" -e NEO4J_AUTH=neo4j/bbotislife neo4j

bbot -t scope.txt -p kitchen-sink --allow-deadly -om neo4j,json,txt -H X-Hackerone=la1n23@wearehackerone.com 

bbot -t scope.txt -p subdomain-enum --allow-deadly -om neo4j,json,txt -H X-Hackerone=la1n23@wearehackerone.com
```


 Probe live hosts
```bash
# -bp - first 100 chars of body
# -cl - content length
# -fr - follow redirects
~/go/bin/httpx -l all_subs.txt -title -status-code -o live_subs.txt

cat amass-output.txt | dnsgen - | httprobe
```

gau (better than wayback url)
https://github.com/lc/gau
```
gau --o urls.txt --blacklist png,jpg,gif example.com

~/go/bin/gau allocatoreurope.vfc.com  --o urls/allocatoreurope.vfc.com
```

crawling for links and endpoints
```bash
CGO_ENABLED=1 go install github.com/projectdiscovery/katana/cmd/katana@latest
# or
nix-env -f '<nixpkgs>' -iA katana 

katana -u "example.com" -d 3 | grep ".js$" > katana.txt

# use https://github.com/s0md3v/uro to filter urls
# pipx install uro
cat urls.txt | uro
```
waf
```bash
python3 -m pip install wafw00f

wafw00f https://example.org
```

extract endpoints from js files
```bash
git clone https://github.com/GerbenJavado/LinkFinder.git
cd LinkFinder
pip3 install -r requirements.txt
python setup.py install

python linkfinder.py -i https://example.com/1.js -o results.html

### second option
go install github.com/0xsha/GoLinkFinder@latest
while read -r url; do ~/go/bin/GoLinkFinder -d "$url" >> endpoints.txt ; done < js_filtered.txt
```


making screenshots
```
go install github.com/sensepost/gowitness@latest

wget https://github.com/sensepost/gowitness/releases/download/3.0.5/gowitness-3.0.5-linux-amd64

~/go/bin/gowitness scan file -f live_domains.txt --write-db

gowitness report generate
```



to do 
Cloud	cloud_enum, s3scanner
JS Analysis	subjs, SecretFinder