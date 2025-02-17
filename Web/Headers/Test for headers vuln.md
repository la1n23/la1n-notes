##### Supply an arbitrary host header
```http
Host: evil.com
```
##### Supply non numeric port
```http
GET /example HTTP/1.1
Host: vulnerable-website.com:bad-stuff-here
```

##### If you have access to a subdomain
```http
GET /example HTTP/1.1
Host: hacked-subdomain.vulnerable-website.com
```

##### Test overriding headers
```http
GET /example HTTP/1.1
Host: vulnerable-website.com
X-Forwarded-Host: evil.com
```
Another options:
```
X-Host
X-Forwarded-Server
X-HTTP-Host-Override
Forwarded
```
Tip: use burp suite param miner function "Guess headers"
###### Supply an absolute URL
```http
GET https://vulnerable-website.com/ HTTP/1.1
Host: bad-stuff-here
```

##### Add line wrapping
```http
GET /example HTTP/1.1
    Host: bad-stuff-here
Host: vulnerable-website.com
````

