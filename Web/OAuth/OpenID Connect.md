OpenID is OAuth extension, from client application's perspective, the key difference is that there additional set of scopes that are the same for all providers and extra response type: `id_token`

## Roles
The main difference is slightly different terminology:
* Relying party - OAuth client app
* End user - user being authenticated - resource owner
* OpenID provider - OAuth service that supports OpenID Connect

## Claims and scopes
Claims are KW pairs that represent information about the user on the resource server.
Unlike basic OAuth, all OpenID Connect services use an identical set of scopes. In order to use OpenID, the client app must specify the scope` openid` in the auth request. 
Another standard scopes:
* profile
* email
* address
* phone

## ID token
This returns [[JWT]] signed with JWS. Payload contains a list of claims based on the scope that was initially requested.
Benefits: user data is requested within JWT + JWT signature for security.
`id_token` can be requested with additional response types:
```
response_type=id_token token
response_type=id_token code
```

## Identifying OpenID Connect
* Check for `openid` scope presence.
* Simply add `openid` scope or change response type to `id_token` and check if this results in an error.
* Take a look at the OAuth provider's docs
* Check `/.well-known/openid-configuration`

## Vulnerabilities

### Unprotected dynamic client registration
If dynamic client registration is supported, the client application can register itself by sending a `POST` request to a dedicated `/registration` endpoint.
Name of this endpoint is isually provided in theconfig file and docs.
Registration request example:
```http
POST /openid/register HTTP/1.1
Content-Type: application/json
Accept: application/json
Host: oauth-authorization-server.com
Authorization: Bearer ab12cd34ef56gh89

{
    "application_type": "web",
    "redirect_uris": [
        "https://client-app.com/callback",
        "https://client-app.com/callback2"
        ],
    "client_name": "My Application",
    "logo_uri": "https://client-app.com/logo.png",
    "token_endpoint_auth_method": "client_secret_basic",
    "jwks_uri": "https://client-app.com/my_public_keys.jwks",
    "userinfo_encrypted_response_alg": "RSA1_5",
    "userinfo_encrypted_response_enc": "A128CBC-HS256",
    …
}
```
Note that some providers will allow dynamic client registration without any authentication.
For example, we can specify `logo_uri` as http://169.254.169.254/latest/meta-data/iam/security-credentials/admin/
then request
`https://openid-provider.com/client/:clientId/logo` and perform SSRF resulting in getting AWS cloud secret token.

### Allowing authorization requests by reference
Some OpenID providers give you the option to pass auth request parameters as a JWT instead of query params.
If this feature is supported, you can send a single `request_uri` parameter pointing to a JSON web token that contains the rest of the OAuth parameters and their values. Depending on the configuration of the OAuth service, this `request_uri` parameter is another potential vector for SSRF.
To check whether this option is supported, you should look for the `request_uri_parameter_supported` option in the configuration file and documentation. Alternatively, you can just try adding the `request_uri` parameter to see if it works. You will find that some servers support this feature even if they don't explicitly mention it in their documentation.