#### Find local ports:
[[ss]] [[ssh]] [[nc]]

Show ports in use:
```bash
ss -tnl
```

Display default service for each port in use:
```bash
ss -tl
```
#### Forward ports:
```bash
ssh -L 8080:127.0.0.1:8080 albert@target.ip
```
or
```bash
ssh -D 1234 albert@target.ip
```
and configure socks proxy in proxychain config then connect:
```bash
nc localhost 8080
```


