#### Bidirectional port forwarding
```bash
socat TCP4-LISTEN:8080,fork TCP4:10.10.14.18:80
```


https://github.com/andrew-d/static-binaries/blob/master/binaries/linux/x86_64/socat

forward to app
```bash
socat TCP-LISTEN:9999,reuseaddr,fork EXEC:/home/leak & 
```

from 8080 to 8888:
`./socat TCP-LISTEN:8888,fork TCP:127.0.0.1:8080