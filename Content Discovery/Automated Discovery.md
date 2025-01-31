
### Tools

#### ffuf
`ffuf -w /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt -u http://MACHINE_IP/FUZZ`

#### dirb
`dirb http://MACHINE_IP/ /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt`

#### gobuster
  `gobuster dir --url http://MACHINE_IP/ -w /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt`

### Wordlist

https://github.com/danielmiessler/SecLists

Amass - subdomains discovery

#ffuf 