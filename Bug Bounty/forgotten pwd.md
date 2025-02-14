1.
chage header
Host: evil.com
or
X-Forwarded-Host: bing.com

1.
security misconfiguration:
check for DMARc policy domain a mail is sent from. DMARC policy must be enabled
https://mxtoolbox.com/SuperTool.aspx

2.a. mta sts https://easydmarc.com/tools/mta-sts-check


3 
 SPF lookup  for domain

4.
weak password reset implementation
* reset link should not be on HTTP
* predictable reset tokens
* long expiry time of reset token

5.
using reset password link more than one time