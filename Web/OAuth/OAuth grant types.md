Grant types aka OAuth flows:
1. Authorization code
2. Implicit

# OAuth scopes
`scope` is set of data and operations available to access and perform.
Example of read access to a user's contact list:
```
scope=contacts
scope=contacts.read
scope=contact-list-r
scope=https://oauth-authorization-server.com/auth/scopes/user/contacts.readonly
```
There is also [[OpenID]] scopes.
# Authorization code grant type
Flow:
1. The user is asked whether they consent to the requested access
2. If they accept, the client app is granted `authorization code`
3. The client app then exchanges this code with OAuth service to receive an `access token` 
4. Then using `access token` the client app can make API calls

![[OAuth code grant type.jpg]]
#### 1. Authorization request
The clip app sends a request to the OAuth service's `/authorization` endpoint asking for permission to access specific user data.
Concrete endpoint may be different, but you can identify it based on the params used in the request:
```http
GET /authorization?client_id=12345&redirect_uri=https://client-app.com/callback&response_type=code&scope=openid%20profile&state=ae13d489bd00e3c24 HTTP/1.1
Host: oauth-authorization-server.com
```

1. `client_id` - mandatory param containing the unique identifier of the client app. This value is generated when the client app registers with the OAuth service.
2. `redirect_uri` (callback URI/endpoint) - URI to which the user's browser should be redirected when sending the auth code to the client app.
3. `response_type` - which kind of response the client app is expecting. For auth code grant type it's `code`
4. `scope`
5. `state` - unique unguessable value that is tied to the current session on the client app. The OAuth service should return this value in the response along with the auth code. It's a form of CSRF token for the client app.
#### 2. User login and consent
#### 3. Authorization code grant
After the user consents to the requested access, their browser wil be redirected to `/callback` endpoint which specified in `redirect_uri`
```http
GET /callback?code=a1b2c3d4e5f6g7h8&state=ae13d489bd00e3c24 HTTP/1.1
Host: client-app.com
```
#### 4. Access token request
Client app recieves the autrhorization code and use it to exchange for an access token. It sends a server-to-server `POST` request to the OAuth service's `/token` endpoint.
```http
POST /token HTTP/1.1
Host: oauth-authorization-server.com
…
client_id=12345&client_secret=SECRET&redirect_uri=https://client-app.com/callback&grant_type=authorization_code&code=a1b2c3d4e5f6g7h8
```
* `client_secret` - client app identify itself by including the secret key that it was assigned when registering with OAuth service
* `grant_type` - `authorization_code`

#### 5. Access token grant
OAuth service will validate the access token request and granting the client app an access token with the requested scope:
```json
{
    "access_token": "z0y9x8w7v6u5",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "openid profile",
    …
}
```

#### 6. API call
Now its possible to recieve user profiel:
```http
GET /userinfo HTTP/1.1
Host: oauth-resource-server.com
Authorization: Bearer z0y9x8w7v6u5
```

#### 7. Resource grant
OAuth resource server verifies the token and returns requested data:
```json
{
    "username":"carlos",
    "email":"carlos@carlos-montoya.net",
    …
}
```

# Implicit grant type
Receiving auth code step is missed, the client app receives the access token immediately after the user gives their consent.
All communcations happens via browser redirects, no secure back-channel.
This grant type is more suited to SPA and native desktop apps, which cannot easilty store the `client_secret` on the back-end.
![[OAuth implicit grant type.jpg]]
#### 1. Authorization request
`response_type` is set to `token`
```http
GET /authorization?client_id=12345&redirect_uri=https://client-app.com/callback&response_type=token&scope=openid%20profile&state=ae13d489bd00e3c24 HTTP/1.1
Host: oauth-authorization-server.com
```
#### 2. User login and consent
#### 3. Access token grant
OAuth service will redirect the user's browser to the `redirect_uri` specified in auth request.
```http
GET /callback#access_token=z0y9x8w7v6u5&token_type=Bearer&expires_in=5000&scope=openid%20profile&state=ae13d489bd00e3c24 HTTP/1.1
Host: client-app.com
```

#### 4. API call
```http
GET /userinfo HTTP/1.1
Host: oauth-resource-server.com
Authorization: Bearer z0y9x8w7v6u5
```

#### 5. Resource grant
```json
{
    "username":"carlos",
    "email":"carlos@carlos-montoya.net"
}
```