# Bypassing CSP with policy injection
[[XSS]]
i If the site reflects a parameter that you can control, you can inject a semicolon to add your own CSP directives. Usually, this report-uri directive is the final one in the list. 

Normally, it's not possible to overwrite an existing script-src directive. However, Chrome recently introduced the script-src-elem directive, which allows you to control script elements, but not events

https://portswigger.net/research/bypassing-csp-with-policy-injection
```http
Content-Security-Policy: script-src-elem 'none'; script-src-attr 'unsafe-inline'
```

```html
<script>alert("This will be blocked")</script>
<a href="#" onclick="alert('This will be allowed')">test</a>
```

# Protecting against [[Clickjacking attack]] using CSP
i The following directive will only allow the page to be framed by other pages from the same origin:
```
frame-ancestors 'self'
```
 The following directive will prevent framing altogether:
```
frame-ancestors 'none'
```

```
frame-ancestors 'self' https://normal-website.com https://*.robust-website.com
```