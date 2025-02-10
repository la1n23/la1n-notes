[[CSRF]]
Requirements:
* All the parameters required for the targeted request can be determined or guessed by the attacker
* The application's session management is solely based on HTTP cookies, which are automatically included in browser requests

Exploitation:
* To craft a malicious web page that will issue a valid (cross-site) request impersonating the victim
 * The victim to be logged into the application at the time when the malicious cross-site request is issued

#### Weak CSRF token
Possible generation algorithms: `md5(username)`, `sha1(username)`, `md5(current date + username)` and so on

#### Protection possible bypasses
1. Empty token: if server checks the header presence, not value
2. Remove token header completly
3. Random token of the same length
4. Use another sessions token
5. Request method tampering
6. CSRF token fixation (similar to session token fixation) 
7. If the site uses referer as CSRF token, try to remove it from request headers: ```<meta name="referrer" content="no-referrer"```
8. If referer is checked with whitelist regex, try to bypass it


