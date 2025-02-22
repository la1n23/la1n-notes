## Sources
A source is a JavaScript property that accepts data that is potentially attacker-controlled.
Examples:
* `location.search`
* `document.referrer`
* `document.cookie`
Common sources:
```
document.URL
document.documentURI
document.URLUnencoded
document.baseURI
location
document.cookie
document.referrer
window.name
history.pushState
history.replaceState
localStorage
sessionStorage
IndexedDB (mozIndexedDB, webkitIndexedDB, msIndexedDB)
Database
```

## Sinks
A sink is a potentially dangerous JavaScript function or DOM object that can cause undesirable effects if attacker-controlled data is passed to it.
Examples:
* `eval()`
* `document.body.innerHTML`

| DOM-based vulnerability                                                                                             | Example sink               |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| [DOM XSS](https://portswigger.net/web-security/cross-site-scripting/dom-based)                                      | `document.write()`         |
| [Open redirection](https://portswigger.net/web-security/dom-based/open-redirection)                                 | `window.location`          |
| [Cookie manipulation](https://portswigger.net/web-security/dom-based/cookie-manipulation)                           | `document.cookie`          |
| [JavaScript injection](https://portswigger.net/web-security/dom-based/javascript-injection)                         | `eval()`                   |
| [Document-domain manipulation](https://portswigger.net/web-security/dom-based/document-domain-manipulation)         | `document.domain`          |
| [WebSocket-URL poisoning](https://portswigger.net/web-security/dom-based/websocket-url-poisoning)                   | `WebSocket()`              |
| [Link manipulation](https://portswigger.net/web-security/dom-based/link-manipulation)                               | `element.src`              |
| [Web message manipulation](https://portswigger.net/web-security/dom-based/web-message-manipulation)                 | `postMessage()`            |
| [Ajax request-header manipulation](https://portswigger.net/web-security/dom-based/ajax-request-header-manipulation) | `setRequestHeader()`       |
| [Local file-path manipulation](https://portswigger.net/web-security/dom-based/local-file-path-manipulation)         | `FileReader.readAsText()`  |
| [Client-side SQL injection](https://portswigger.net/web-security/dom-based/client-side-sql-injection)               | `ExecuteSql()`             |
| [HTML5-storage manipulation](https://portswigger.net/web-security/dom-based/html5-storage-manipulation)             | `sessionStorage.setItem()` |
| [Client-side XPath injection](https://portswigger.net/web-security/dom-based/client-side-xpath-injection)           | `document.evaluate()`      |
| [Client-side JSON injection](https://portswigger.net/web-security/dom-based/client-side-json-injection)             | `JSON.parse()`             |
| [DOM-data manipulation](https://portswigger.net/web-security/dom-based/dom-data-manipulation)                       | `element.setAttribute()`   |
| [Denial of service](https://portswigger.net/web-security/dom-based/denial-of-service)                               | `RegExp()`                 |