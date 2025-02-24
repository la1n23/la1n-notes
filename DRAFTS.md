Online vulnerability scanner
https://hackertarget.com/

https://docs.securitytrails.com/docs/overview

https://github.com/epi052/feroxbuster
```bash
curl -sL https://raw.githubusercontent.com/epi052/feroxbuster/main/install-nix.sh | bash -s $HOME/.local/bin
```
```bash
feroxbuster --url http://10.129.136.9:8080
```

TODO:
make notes of CSP (cdn and nonce) from HTB challenges:
[[CSP]]
https://csp-evaluator.withgoogle.com

Vuln scanner good for BB and with custom templates support:
https://github.com/projectdiscovery/nuclei
has AI support (since 3.3.9)
get API key here https://cloud.projectdiscovery.io/
and run 
`nuclei -auth`
prompt examples:
```
-ai "Perform fuzzing on all parameters and HTTP methods using DSL, focusing on detecting XSS vulnerabilities (Reflected, Stored, and DOM-based) with pre-conditions."
-ai "Detect exposed .git repositories and sensitive files"
-ai "Identify default credentials on login pages"
-ai "Identify open FTP servers allowing anonymous access"
```

Faster [[nmap]]:
https://github.com/RustScan/RustScan
```bash
wget https://github.com/RustScan/RustScan/releases/download/2.4.1/x86_64-linux-rustscan.tar.gz.zip
unzip x86_64-linux-rustscan.tar.gz.zip 
tar xf ./x86_64-linux-rustscan.tar.gz 

./rustscan -a 10.10.10.1

./rustscan -a 10.129.136.9 -p 8080 -- -sV
```


[[bb]] methodology
https://github.com/jhaddix/tbhm

TODO:
split notes on recon, enumeration, post-explotation, privelege escalation