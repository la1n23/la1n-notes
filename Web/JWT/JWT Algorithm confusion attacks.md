Algorithm confusion attacks (also known as key confusion attacks) occur when an attacker is able to force the server to verify the signature of a [[JWT]] using a different algorithm than is intended by the website's developers.
# Symmetric vs asymmetric algorithms
HS256 (HMAC + SHA-256) use a "symmetric" key:
![[jwt-symmetric-key.png]]RS256 (RSA + SHA-256) use an "asymmetric" key pair
![[jwt-assymetric-key.png]]
# Vulnerable code of sample JWT library
```js
function verify(token, secretOrPublicKey){
    algorithm = token.getAlgHeader();
    if(algorithm == "RS256"){
        // Use the provided key as an RSA public key
    } else if (algorithm == "HS256"){
        // Use the provided key as an HMAC secret key
    }
}
```
An attacker could sign the token using HS256 and the public key, and the server will use the same public key to verify the signature. 
```js
publicKey = <public-key-of-server>;
token = request.getCookie("session");
verify(token, publicKey);
```

# Attack
### Step 1 - Obtain the server's public key
```
/.well-known/jwks.json
```
or
```
/jwks.json
```

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
}
```
### Step 2 - Convert the public key to a suitable format
Let's assume that we need the key in **X.509 PEM** format. You can convert a JWK to a PEM using the JWT Editor extension in Burp as follows:
* Go to the JWT Editor Keys tab.
* Click New RSA Key. In the dialog, paste the JWK that you obtained earlier.
* Select the PEM radio button and copy the resulting PEM key.
* Go to the Decoder tab and Base64-encode the PEM.
* Go back to the JWT Editor Keys tab and click New Symmetric Key.
* In the dialog, click Generate to generate a new key in JWK format.
* Replace the generated value for the `k` parameter with a Base64-encoded PEM key that you just copied.
### Step 3 - Modify your JWT
Make sure that the `alg` header is set to `HS256`
### Step 4 - Sign the JWT using the public key
 Sign the token using the HS256 algorithm with the RSA public key as the secret. 

# Deriving public keys from existing tokens
Tools:
* https://github.com/silentsignal/rsa_sign2n
*  `jwt_forgery.py`
	* `docker run --rm -it portswigger/sig2n <token1> <token2>`
	* Try to brute-force tampered JWTs to find the one which work 

