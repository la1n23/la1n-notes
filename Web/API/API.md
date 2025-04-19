# Draft
axiom (for clouds)

JSON to graph
https://jsoncrack.com/editor

# Fuzzing
Random data generator:
radamsa
# Wordlist
https://github.com/chrislockard/api_wordlist
https://raw.githubusercontent.com/fuzzdb-project/fuzzdb/refs/heads/master/discovery/common-methods/common-methods.txt
/Discovery/Web-Content/api
/Discovery/Web-Content/common-api-endpoints-mazen160.txt
/Discovery/Web-Content/raft-small-words.txt
https://github.com/hAPI-hacker/Hacking-APIs
Wordlist from swagger.json
```bash
cat your-oas-api-spec-doc.json | jq -r '.components.schemas.[].properties? | keys? | .[]' | sort -u > json-wordlist.txt
```
# Params discovery
https://github.com/s0md3v/Arjun
```bash
pipx install arjun
arjun -u http://localhost:8091/api/users
```
# Vulnerabilities
* IDOR 
* BOLA
* BFLA
* Exposure of Sensitive Data 
* Improper input validation
	* Injections
	* Query
	* Numbers
* Mass assignment
* Unrestricted resource consumption
* Security misconfiguration (like CORS)
* Improper Assets Management (prev version of API enabled like v0)

# Improper Assets management
```
api.target.com/v3
/api/v2/accounts
/api/v3/accounts
/v2/accounts

Accept: version=2.0
Accept api-version=3

/api/accounts?ver=2
POST /api/accounts

{
"ver":1.0,
"user":"hapihacker"
}
```
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