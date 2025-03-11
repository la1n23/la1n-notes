#linux
#### Port scanning without [[nmap]]
```bash
for PORT in {0..1000}; do timeout 1 bash -c "</dev/tcp/172.19.0.1/$PORT
&>/dev/null" 2>/dev/null && echo "port $PORT is open"; done
```
##### Find file 
```bash
locate flag.txt
```
##### Tree view of directory
```bash
tree .
```
##### Convert html to text
```bash
sudo apt install html2text
curl -s http://ya.ru | html2text 
```

##### Recursively download site (via index directories)
```bash
sudo apt install httrack
httrack http://example.com/ -O /path/to/output -r5
# only txt files
httrack http://example.com/ -o /path/to/output -r5 +*.txt
```

##### htop replacement
`sudo apt install -y btop`

#### security
https://www.snort.org/
https://www.chkrootkit.org/
https://packages.debian.org/sid/rkhunter
https://cisofy.com/lynis/
