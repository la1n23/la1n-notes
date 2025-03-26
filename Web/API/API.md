API endpoints:
* IDOR / BOC
* Broken Object Property Level Authorization
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