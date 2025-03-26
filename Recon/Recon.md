projectdiscovery.io
https://crt.sh/

paid:
securitytrails
hackertarget

https://dnsdumpster.com/

For quick scan:
assetfinder -subs-only ishosting.com > assetfinder.txt
subfinder -d ishosting.com -o subfinder.txt

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
```
httpx -l all_subs.txt -title -status-code -o live_subs.txt

cat amass-output.txt | dnsgen - | httprobe
```

gau (better than wayback url)
https://github.com/lc/gau
```
gau --o urls.txt --blacklist png,jpg,gif example.com

~/go/bin/gau allocatoreurope.vfc.com  --o urls/allocatoreurope.vfc.com
```


waf
```
python3 -m pip install wafw00f

wafw00f https://example.org
```

extract endpoints from js files
```
git clone https://github.com/GerbenJavado/LinkFinder.git
cd LinkFinder
pip3 install -r requirements.txt
python setup.py install

python linkfinder.py -i https://example.com/1.js -o results.html
```


making screenshots
```
go install github.com/sensepost/gowitness@latest

wget https://github.com/sensepost/gowitness/releases/download/3.0.5/gowitness-3.0.5-linux-amd64

~/go/bin/gowitness scan file -f live_domains.txt --write-db

gowitness report generate
```



to do 
nuclei
probably nikto
ffuf
Cloud	cloud_enum, s3scanner
JS Analysis	subjs, SecretFinder