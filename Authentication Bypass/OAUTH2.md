#### Authorization Code Grant
![[Pasted image 20250120015143.png]]
#### Implicit Grant
Deprecate in OAUTH 2.1
![[Pasted image 20250120015230.png]]
#### Resource Owner Password Credentials Grant
![[Pasted image 20250120015304.png]]
#### Client Credentials Grant
![[Pasted image 20250120015327.png]]
#### Stealing OAUTH Token
Tokens play a critical role in the OAuth 2.0 framework, acting as digital keys that grant access to protected resources. These tokens are issued by the authorization server and redirected to the client application based on the `redirect_uri` parameter. This redirection is crucial in the OAuth flow, ensuring that tokens are securely transmitted to the intended recipient. However, if the `redirect_uri` is not well protected, attackers can exploit it to hijack tokens.
#### CSRF - Vulnerability of Weak or Missing State Parameter
The **state** parameter in the OAuth 2.0 framework protects against CSRF attacks, which occur when an attacker tricks a user into executing unwanted actions on a web application where they are currently authenticated. In the context of OAuth, CSRF attacks can lead to unauthorized access to sensitive resources by hijacking the OAuth flow. The state parameter helps mitigate this risk by maintaining the integrity of the authorization process.

#### Implicit Grant Flow 
In the implicit grant flow, tokens are directly returned to the client via the browser without requiring an intermediary authorization code. This flow is primarily used by single-page applications and is designed for public clients who cannot securely store client secrets. However, this flow has inherent vulnerabilities:

Weaknesses
- **Exposing Access Token in URL**: The application redirects the user to the OAuth authorization endpoint, which returns the access token in the URL fragment. Any script running on the page can easily access this fragment.
- **Inadequate Validation of Redirect URIs**: The OAuth server does not adequately validate the redirect URIs, allowing potential attackers to manipulate the redirection endpoint.
- **No HTTPS Implementation**: The application does not enforce HTTPS, which can lead to token interception through man-in-the-middle attacks.
- **Improper Handling of Access Tokens**: The application stores the access token insecurely, possibly in `localStorage` or `sessionStorage`, making it vulnerable to XSS attacks.

#auth