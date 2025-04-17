# Draft
Kiterunner (rest api) - endpoint discovery
axiom (for clouds)

IDOR - autorize burp ext

JSON to graph
https://jsoncrack.com/editor

# Wordlist
https://github.com/chrislockard/api_wordlist
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/refs/heads/master/discovery/common-methods/common-methods.txt
/Discovery/Web-Content/api
/Discovery/Web-Content/common-api-endpoints-mazen160.txt
/Discovery/Web-Content/raft-small-words.txt
https://github.com/hAPI-hacker/Hacking-APIs
# Params discovery
https://github.com/s0md3v/Arjun
```bash
pipx install arjun
arjun -u http://localhost:8091/api/users
```
# Vulnerabilities
* IDOR / BOC
* BOLA
* Broken Object Property Level Authorization
	* Exposure of Sensitive Information Due to Incompatible Policies https://cwe.mitre.org/data/definitions/213.html
	* Mass assignment  CWE-915
* Unrestricted resource consumption
* Broken Function Level Authorization
* Security misconfiguration (like CORS)
* Improper Inventory Management (prev version of API enabled like v0)

# Testing
* [[HTTP Verb Tampering]]
* Remove a field completely
* Supply null / empty array / empty string
* Check for integer overflow
* Check for string overflow and truncation (255 chars)

# Case 1
Endpoint payload: 
```json
value: "test@test.com"
```
to
```json
value: [
"test@test.com",
"another@test.com"
]
```
# API source code endpoint scanner
https://github.com/noir-cr/noir