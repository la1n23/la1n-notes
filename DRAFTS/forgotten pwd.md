1.
chage header
Host: evil.com
or
X-Forwarded-Host: bing.com

2.
check for DMARc policy domain a mail is sent from. DMARC policy must be enabled


3 
 SPF lookup  for domain

4.
weak password reset implementation
* reset link should not be on HTTP
* predictable reset tokens
* long expiry time of reset token

5.
using reset password link more than one time