##### Fix tty:
```bash
python -c 'import pty; pty.spawn("/bin/bash")'
```

#### PHP
https://github.com/Wh1ter0sEo4/reverse_shell_php/blob/main/reverse_shell.php

##### Java:
https://alionder.net/jenkins-script-console-code-exec-reverse-shell-java-deserialization/

##### Socat port forwarding:
Download:
https://github.com/andrew-d/static-binaries/blob/master/binaries/linux/x86_64/socat

from 8080 to 8888:
`./socat TCP-LISTEN:8888,fork TCP:127.0.0.1:8080

ssh port forwarding:
```shell-session
root@kali$ ssh -L 55553:127.0.0.1:55553 root@192.168.0.44
```
