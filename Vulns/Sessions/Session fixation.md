#sessions
**Stage** 1. obtain a valid session identifier (via log in or just visiting site)

**Stage 2.** fixation a valid session identifier
* session identifier pre-login remains the same post-login
* session identifiers (e.g. cookies) are being accepted from URL query or POST data and propagated to the app

**Stage 3.** attacker tricks the victim into establishing a session using the abovementioned session identifier

Examples:
http://oredirect.htb.net/?redirect_uri=/complete.html&token=IControlThisCookie

http://insecure.exampleapp.com/login?PHPSESSID=AttackerSpecifiedCookieValue