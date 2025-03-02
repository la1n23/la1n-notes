In some instances, servers can be persuaded to ignore the Content-Length header, meaning they assume that each request finishes at the end of the headers. This is effectively the same as treating the Content-Length as 0. 

# Testing
In the following example, the follow-up request for the home page has received a 404 response. This strongly suggests that the back-end server interpreted the body of the POST request (`GET /404`...) as the start of another request. 
**Request 1:**
```http
POST /resources/images/blog.svg HTTP/1.1
Host: 0ae7008203089b84c5315d8900d000bb.web-security-academy.net
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 25

GET /404 HTTP/1.1
Foo: x
```
**Request 2**:
```http
GET / HTTP/1.1
Host: 0ae7008203089b84c5315d8900d000bb.web-security-academy.net
```
Send two requests in sequence using a single connection.
If the second request returns 404, then `/resources/images/blog.svg` is vulnerable to CL.0 attack.
# Eliciting CL.0 behavior
When a request's headers trigger a server error, some servers issue an error response without consuming the request body off the socket. If they don't close the connection afterwards, this can provide an alternative CL.0 desync vector.

You can also try using `GET` requests with an obfuscated `Content-Length` header. If you're able to hide this from the back-end server but not the front-end, this also has the potential to cause a desync. We looked at some header obfuscation techniques when we covered [[HTTP RS Attacks#TE.TE obfuscating the TE header]] request smuggling. 

# H2.0 vulnerabilities
Websites that downgrade [[HTTP 2 RS]] requests to HTTP/1 may be vulnerable to an equivalent "H2.0" issue if the back-end server ignores the `Content-Length` header of the downgraded request. 