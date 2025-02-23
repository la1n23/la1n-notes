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
