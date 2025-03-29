nmap -p 443, 8443, 80,8000, 8080 -oG ...
naabu -top-ports -top-port 100 -silent -list ips.txt

what is it
tlsx -l ips.txt -cn -san -silent -p 443,8443

httpx -fr -td -cl -ct -silent -o httpx.txt

IIS enum
shortsscan


curl https://site.com | getallurls


waymore -mode U -i example.com
~/.config/waymore


search domain on github 

dorking
site:example.com inurl:.jsp