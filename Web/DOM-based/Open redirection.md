DOM-based open-redirection vulnerabilities arise when a script writes attacker-controllable data into a sink that can trigger cross-domain navigation. For example, the following code is vulnerable due to the unsafe way it handles the `location.hash` property
```javascript
let url = /https?:\/\/.+/.exec(location.hash);
if (url) {
	location = url[0];
}
```

## Sinks examples
```
location
location.host
location.hostname
location.href 
location.pathname
location.search
location.protocol 
location.assign()
location.replace() 
open() 
element.srcdoc 
XMLHttpRequest.open() 
XMLHttpRequest.send() 
jQuery.ajax() 
$.ajax()
```

## Prevention
Avoid dynamically setting redirection targets using data from untrusted source.