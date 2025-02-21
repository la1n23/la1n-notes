#auth
### Vertical privilege escalation

#### Unprotected functionality
`https://insecure-website.com/admin`

#### Parameter-based access control methods
- A hidden field.
- A cookie.
- A preset query string parameter.
```
https://insecure-website.com/login/home.jsp?admin=true
https://insecure-website.com/login/home.jsp?role=1
```

#### Broken access control resulting from platform misconfiguration
`DENY: POST, /admin/deleteUser, managers`
```http
POST / HTTP/1.1
X-Original-URL: /admin/deleteUser
```
or `X-Rewrite-URL` header might be supported by server.

An alternative attack relates to the HTTP method used in the request.

#### Broken access control resulting from URL-matching discrepancies
For example, they may tolerate inconsistent capitalization, so a request to `/ADMIN/DELETEUSER` may still be mapped to the `/admin/deleteUser` endpoint. If the access control mechanism is less tolerant, it may treat these as two different endpoints and fail to enforce the correct restrictions as a result.

Similar discrepancies can arise if developers using the Spring framework have enabled the `useSuffixPatternMatch` option. This allows paths with an arbitrary file extension to be mapped to an equivalent endpoint with no file extension. In other words, a request to `/admin/deleteUser.anything` would still match the `/admin/deleteUser` pattern. Prior to Spring 5.3, this option is enabled by default.

On other systems, you may encounter discrepancies in whether `/admin/deleteUser` and `/admin/deleteUser/` are treated as distinct endpoints. In this case, you may be able to bypass access controls by appending a trailing slash to the path.

### Horizontal privilege escalation
[[IDOR]]

### Access control vulnerabilities in multi-step processes
The website assumes that a user will only reach step 3 if they have already completed the first steps, which are properly controlled. An attacker can gain unauthorized access to the function by skipping the first two steps and directly submitting the request for the third step with the required parameters.

### Referer-based access control
Server checks referer header.

### Location-based access control
These access controls can often be circumvented by the use of web proxies, VPNs, or manipulation of client-side geolocation mechanisms.

## How to prevent access control vulnerabilities
- Never rely on obfuscation alone for access control.
- Unless a resource is intended to be publicly accessible, deny access by default.
- Wherever possible, use a single application-wide mechanism for enforcing access controls.
- At the code level, make it mandatory for developers to declare the access that is allowed for each resource, and deny access by default.
- Thoroughly audit and test access controls to ensure they work as designed.