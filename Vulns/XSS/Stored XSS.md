[[Pentest/Vulns/XSS/XSS|XSS]]

#xss
##### How to find
Test all entry points and exit points.
**Entry points**:
* Parameters or other data within the URL query string and message body. 
* URL file path
* HTTP request headers
* Out-of-band routes to deliver data to application
	* webmail application received data in emails
	* some twitter app received data contained in third-party tweets
	* news aggregator process other sites content
**Exit points**:
any data connected to entry points can be an exit point


