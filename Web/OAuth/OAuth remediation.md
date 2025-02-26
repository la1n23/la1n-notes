# Service providers
* Whitelist for `redirect_uris` using EXACT MATCH
* Enforce use of  the `state` param
* On the resource server verify that the access token was issued to the same `client_id` that is making thee request. Also check the scope being requested to match the scope for which the token was originally granted.

# Client applications
* Always use `state` param even though it is not mandatory
* Send a `redirect_uri` parameter not only to the `/authorization` endpoint, but also to the `/token` endpoint.
* When developing mobile or native desktop OAuth client applications, it is often not possible to keep the `client_secret` private. In these situations, the `PKCE` (`RFC 7636`) mechanism may be used to provide additional protection against access code interception or leakage.
* If you use [[OpenID Connect]], check [[JWT Remediation]] 
* Be careful with authorization codes - they may be leaked via `Referer` headers when external images, scripts, or CSS content is loaded. It is also important to not include them in the dynamically generated JavaScript files as they may be executed from external domains via `<script>` tags.