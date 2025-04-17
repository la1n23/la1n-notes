
```bash
# wget https://wordlists-cdn.assetnote.io/rawdata/kiterunner/routes-large.json.tar.gz
wget https://wordlists-cdn.assetnote.io/rawdata/kiterunner/routes-small.json.tar.gz
aunpack routes-small.json.tar.gz

kiterunner kb convert routes-small.json routes-small.kite
kiterunner scan -w routes-small.kite http://localhost:8091              

kiterunner brute <target> -w ~/api/wordlists/data/automated/nameofwordlist.txt


# replay request. just copy whole line of desired requests output
kr kb replay "GET     414 [    183,    7,   8] ://192.168.50.35:8888/api/privatisations/count 0cf6841b1e7ac8badc6e237ab300a90ca873d571" -w ~/api/wordlists/data/kiterunner/routes-large.kite
```