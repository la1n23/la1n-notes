[[XSS|XSS]]
#xss
##### About
Payload reflected in response. Example: infected search query reflects in page DOM.

###### How to find
1. Test every entry point. Including HTTP headers
2. Submit random alphanumeric values. Like 8 alphanumeric chars.
3. Determine the reflection context: between HTML tags, within a tag attribute which might be quoted, within JS script, etc.
4. Test a candidate payload
5. Test alternative payloads
6. Test the attack in a browser