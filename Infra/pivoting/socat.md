#### Biderectional port forwarding
```bash
socat TCP4-LISTEN:8080,fork TCP4:10.10.14.18:80
```