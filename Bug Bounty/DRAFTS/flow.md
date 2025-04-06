# Choose target with wide scope
#### Choosing a target
budget
organization size 
scope

extension - multiple link opener

search by company name
https://bgp.he.net/

https://bugbountyforum.com/tools/
https://www.bugbountyhunter.com/guides/?type=bugbounty_toolkit
# Basic recon
https://github.com/nahamsec/lazyrecon
Google for published bug reports of chosen target
Manually explore the site functionality, make notes of site behavior, start create wordlist

 * basic XSS, open redirects, SSRF
 - js files
 - dorks
site:example.com inurl:register inurl:& site:example.com inurl:signup inurl:&
site:example.com inurl:join inurl:&

* register
* login
* reset pwd

details
* where is the site hosted
* is any dev tools available
* used tech such as aws

features:
* list of main features
* old and new features
* paid features and free features
* different roles and available features
# Expanding attack surface
## dorking

login, register, upload, contact, feedback, join, signup, profile, user, comment, api, developer, affiliate, careers, upload, mobile, upgrade, passwordreset
https://exposingtheinvisible.org/guides/google-dorking/

use meaningfull extension for dorking and wordlists:
php, aspx, jsp, txt, xml, bak. 

“domain.com” api_secret, api_key, apiKey, apiSecret, password,
admin_password 


WayBackMachine leaking old endpoints 

parse js scripts
scan API for endpoints and params
scan for dirs
scan for files

repeat each step more than one time

