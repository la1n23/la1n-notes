#http 
#request-smuggling 
Portswigger researches:
https://portswigger.net/research/http-desync-attacks-request-smuggling-reborn
https://portswigger.net/research/http2
https://portswigger.net/research/browser-powered-desync-attacks

# Burp request smuggler
1. Send request to repeater
2. RMB -> extensions -> convert to chunked
3. Fix chunked and content-length to perform desired attack
4. PROFIT!


Headers that can define request end: `Content-Length` and `Transfer-Encoding: chunked`
```http
POST /search HTTP/1.1
Host: normal-website.com
Content-Type: application/x-www-form-urlencoded
Transfer-Encoding: chunked

b
q=smuggling
0
```
First line is chunk size in hex, the second is content, the third is chunk termination.
Chunks are used by servers, browsers doesn't almost use it.

If both chunk and `Content-Length`  headers are provided, then `Content-Length` should be ignored.
Problems arise when two or more servers used:
* Some servers do not support the Transfer-Encoding header in requests. 
* Some servers that do support the Transfer-Encoding header can be induced not to process it if the header is obfuscated in some way.

HTTP/2 is immune to HTTP smuggling unless HTTP downgrade occurs.