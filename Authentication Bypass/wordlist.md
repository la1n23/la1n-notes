# Language codes
```bash
npm init && npm i locale-codes

cat << DONE > index.js
const locale = require('locale-codes')

for (let lang of locale.all.map(({tag}) => tag.replace('-', '_'))) {
  console.log(lang);
}
DONE

node index.js > langs.txt
```
# Usernames
```bash
sudo apt install ruby -y
git clone https://github.com/urbanadventurer/username-anarchy.git
cd username-anarchy

./username-anarchy Jane Smith > jane_smith_usernames.txt
./username-anarchy -i user_names.txt > jane_smith_usernames.txt
```
# Passwords
## Crunch
```bash
crunch <minimum length> <maximum length> <charset> -t <pattern> -o <output file>

crunch 17 17 -t ILFREIGHT201%@@@@ -o wordlist
# -d 1 number of char repetition
crunch 12 12 -t 10031998@@@@ -d 1 -o wordlist
```
#### Pattern:
@ - lower case alpha characters
,  - upper case alpha characters
% - numeric characters
^ - special characters including space
## CUPP
`Common User Password Profiler`
```bash
python3 cupp.py -i
# or
cupp -i

[+] Insert the information about the victim to make a dictionary
[+] If you don't know all the info, just hit enter when asked! ;)

> First Name: roger
> Surname: penrose
> Nickname:      
> Birthdate (DDMMYYYY): 11051972

> Partners) name: beth
> Partners) nickname:
> Partners) birthdate (DDMMYYYY):

> Child's name: john
> Child's nickname: johnny
> Child's birthdate (DDMMYYYY):

> Pet's name: tommy
> Company name: INLANE FREIGHT

> Do you want to add some key words about the victim? Y/[N]: Y
> Please enter the words, separated by comma. [i.e. hacker,juice,black], spaces will be removed: sysadmin,linux,86391512
> Do you want to add special chars at the end of words? Y/[N]:
> Do you want to add some random numbers at the end of words? Y/[N]:
> Leet mode? (i.e. leet = 1337) Y/[N]:

[+] Now making a dictionary...
[+] Sorting list and removing duplicates...
[+] Saving dictionary to roger.txt, counting 2419 words.
[+] Now load your pistolero with roger.txt and shoot! Good luck!

# download wordlists
cupp -l
cupp -a
```
## KWPROCESSOR
Kwprocessor is a tool that creates wordlists with keyboard walks.
```bash
git clone https://github.com/hashcat/kwprocessor && cd kwprocessor
make
# -s - shift
kwp -s 1 basechars/full.base keymaps/en-us.keymap  routes/2-to-10-max-3-direction-changes.route
```
## Princeprocessor
Combine all words to create wordlists.
```bash
wget https://github.com/hashcat/princeprocessor/releases/download/v0.22/princeprocessor-0.22.7z
7z x princeprocessor-0.22.7z
cd princeprocessor-0.22
# --keyspace - display number of combinations
./pp64.bin --keyspace < words
# create wordlist
# --pw-min=16      - min length
# --pw-max=32      - max length, default is 16
# --elem-cnt-min=3 - number of elements, e.g. dogdogdog
./pp64.bin -o wordlist.txt < words
```
## Cewl
It spiders and scrapes a website and creates a list of the words that are present
```bash
cewl -d <depth to spider> -m <minimum word length> -w <output wordlist> <url of website>

# -m 8 - min length
cewl -d 5 -m 8 -e http://inlanefreight.com/blog -w wordlist.txt
```
## [[hashcat]] Rules
Full Docs: https://hashcat.net/wiki/doku.php?id=rule_based_attack#implemented_compatible_functions
#### Generate
```bash
hashcat --force password.list -r custom.rule --stdout | sort -u > mut_password.list
```
#### Prebuilt rules
```bash
ls /usr/share/hashcat/rules/
```
#### Rules from HTB
https://academy.hackthebox.com/storage/resources/Password-Attacks.zip
#### Rules creation
```
c so0 si1 se3 ss5 sa@ $2 $0 $1 $9
```
The first letter word is capitalized with the c function. Then rule uses the substitute function s to replace o with 0, i with 1, e with 3 and a with @. At the end, the year 2019 is appended to it. Copy the rule to a file so that we can debug it.
#### Random rules
Generate 1000 rules:
```bash
hashcat -a 0 -m 100 -g 1000 hash /opt/useful/seclists/Passwords/Leaked-Databases/rockyou.txt
 ```
#### Links to rules
https://github.com/NSAKEY/nsa-rules
https://github.com/praetorian-code/Hob0Rules
https://github.com/sparcflow/HackLikeALegend/blob/master/old/chap3/corporate.rule