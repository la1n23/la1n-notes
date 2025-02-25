## Validation of Referer depends on header being present
Some apps validate `Referer` header when it is present in requests but skip the validation if the header is omitted.
Easiest way to drop the `Referer` header is using a META tag within the page that hosts the CSRF attack:
```html
<meta name="referrer" content="never">
```
lab: https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses/lab-referer-validation-depends-on-header-being-present

#to-be-continued 
https://portswigger.net/web-security/csrf/bypassing-referer-based-defenses