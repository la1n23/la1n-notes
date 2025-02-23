https://portswigger.net/research/hidden-oauth-attack-vectors

## Flawed [[CSRF]] protection
`state` parameter should ideally contain an unguessable value, such as the of something tied to user's session when it first initiatees the OAuth flow. The value is then passed back and forth between the client and OAuth server as form of CSRF token. If `state` is omitted, it's possible to hijack a victim's account by binding it to the attacker social media.

#to-be-continued 