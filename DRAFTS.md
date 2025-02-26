Lateral Movement
add folder for this stage


Online vulnerability scanner
https://hackertarget.com/

https://docs.securitytrails.com/docs/overview


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


[[bb]] methodology
https://github.com/jhaddix/tbhm

TODO:
split notes on recon, enumeration, post-explotation, privelege escalation
later movements