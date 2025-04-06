https://github.com/coffinxp/nuclei-templates

nuclei -u https://target.com -t ~/nuclei-templates/  -tags exposure,misconfig,file,fuzz

Top templates to always run:
* exposed-panels/ (Admin interfaces)
* cves/ (Recent vulnerabilities)
* default-logins/ (Default credentials)
* exposures/ (API keys, tokens)
* misconfiguration/ (Security headers, CORS)



-t nuclei-templates/http/custom/api/

nuclei -o nuclei.txt
nuclei -t http/exposures/
nuclei -t http/technologies/tech-detect.yaml -t http/technologies/nginx/nginx-version.yaml
nuclei -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' -l targets.txt
20 -c 5

nuclei -config nuclei.yaml -l targets.txt
```
header:
  - 'X-BugBounty-Hacker: h1/nickname'

templates:
  - cves/
  - vulnerabilities/
  - misconfiguration/

tags: exposures,cve
severity: critical,high,medium

include-templates:
  - vulnerabilities/xxx
  - misconfiguration/xxxx

exclude-tags: info,fuzz
exclude-templates:
  - vulnerabilities/xxx
  - misconfiguration/xxxx

# Rate Limit configuration
rate-limit: 50
bulk-size: 20
concurrency: 20
```

nuclei -u https://target.com -t ~/nuclei-templates/ \
  -tags exposure,misconfig,file,fuzz

Top templates to always run:
* exposed-panels/ (Admin interfaces)
* cves/ (Recent vulnerabilities)
* default-logins/ (Default credentials)
* exposures/ (API keys, tokens)
* misconfiguration/ (Security headers, CORS)
