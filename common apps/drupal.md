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
## Uploading a Backdoored Module
```bash
wget --no-check-certificate  https://ftp.drupal.org/files/projects/captcha-8.x-1.2.tar.gz
