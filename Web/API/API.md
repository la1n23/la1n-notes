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
# Endpoint scanner
https://github.com/noir-cr/noir