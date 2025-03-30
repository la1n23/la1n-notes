#### Install db of exploits:
```shell
sudo apt install exploitdb exploitdb-bin-sploits exploitdb-papers -y
```
#### Search 
```bash
searchsploit Cuppa
```
#### Download POC:
```bash
searchsploit -m php/webapps/25971.txt
```
#### Links
https://www.exploit-db.com/
https://www.rapid7.com/db/
https://www.vulnerability-lab.com/
#### msfconsole
```msf
msf6 > search exploit eternalblue
```