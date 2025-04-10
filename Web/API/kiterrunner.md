
```bash
# wget https://wordlists-cdn.assetnote.io/rawdata/kiterunner/routes-large.json.tar.gz
wget https://wordlists-cdn.assetnote.io/rawdata/kiterunner/routes-small.json.tar.gz
aunpack routes-small.json.tar.gz

kiterunner kb convert routes-small.json routes-small.kite
kiterunner scan -w routes-small.kite http://localhost:8091              
```