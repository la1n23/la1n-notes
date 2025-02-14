* User-supplied input transmitted to the server might be processed in unsafe ways, leading to vulnerabilities such as SQL injection or XML external entity injection [[SQLi]] #xml 
* Some blind vulnerabilities reached via WebSockets might only be detectable using out-of-band (OAST) techniques.
* If attacker-controlled data is transmitted via WebSockets to other application users, then it might lead to XSS or other client-side vulnerabilities.

##### Manipulating handshake
* Misplaced trust in HTTP headers to perform security decisions, such as the `X-Forwarded-For` header [[Exploit headers vulns]]
* Flaws in session handling mechanisms, since the session context in which WebSocket messages are processed is generally determined by the session context of the handshake message
* Attack surface introduced by custom HTTP headers used by the application

##### [[XSS]] obfuscating
#encoding 
```js
<img src='x' OnErEoR='alert`1`' />"
```

##### Cross-site WebSocket hijacking
[[CSRF]]

* Perform unauthorized actions masquerading as the victim user.
* Retrieve sensitive data that the user can access.
	
Example of request without CSRF token, only session is required.
```http
GET /chat HTTP/1.1
Host: normal-website.com
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: wDqumtseNBJdhkihL6PW7w==
Connection: keep-alive, Upgrade
Cookie: session=KOsEJNuflw4Rd9BDNrVmvwBF9rEijeE2
Upgrade: websocket
```
