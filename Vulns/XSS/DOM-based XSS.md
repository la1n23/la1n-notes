[[Pentest/Vulns/XSS/XSS|XSS]]
#xss
It's like [[Reflected XSS]], but the payload doesnt go though server.

TODO: more details and examples

**Automated search**: DOM Invader in burp browser extension.

##### How to find
1. Search for entry points like `location.search`. Inject a random payload into it.
2. Grep the response HTML for used payload.
3. Adjust payload to execute it

**sink / payload**:
* `document.write` / `<svg onload=alert(1) />`
* `innerHTMl=` /  `<img src=x onerror=alert(1) />` 
	* or iframe tag bc script tag, svg onload wont work
* [[jquery]] `attr()` / `?returnUrl=javascript:alert(document.domain)`

**List of sinks**: https://portswigger.net/web-security/cross-site-scripting/dom-based#which-sinks-can-lead-to-dom-xss-vulnerabilities