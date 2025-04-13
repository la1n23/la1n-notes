nmap
```bash
sudo  nmap -p 80,443,8000,8080,8180,8888,10000 --open -oA nmap_scan -iL scope_list 
```
eyewitness
```bash
sudo apt install eyewitness

eyewitness --web -x nmap_scan.xml -d inlanefreight_eyewitness
```
aquatone
outdate
https://github.com/michenriksen/aquatone/releases/download/v1.7.0/aquatone_linux_amd64_1.7.0.zip
fork
```bash
git clone https://github.com/shelld3v/aquatone
cd aquatone
./build

cat nmap_scan.xml | ./aquatone -nmap
```