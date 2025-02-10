#### Find local ports:
[[ss]] [[ssh]] [[nc]]

`ss -tnl`

Display default serivice for each port:
```
ss -tl
```
#### Forward ports;
```
ssh -L 8080:127.0.0.1:8080 albert@target.ip
```
or
```
ssh -D 1234 albert@target.ip
```
and configure socks proxy in proxychain config then connect:
```
nc localhost 8080
```


