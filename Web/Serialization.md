# #php

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
https://github.com/frohoff/ysoserial/releases/download/v0.0.6/ysoserial-all.jar

Example of usage on #java v21:O
```bash
java \
   --add-opens=java.xml/com.sun.org.apache.xalan.internal.xsltc.trax=ALL-UNNAMED \
   --add-opens=java.xml/com.sun.org.apache.xalan.internal.xsltc.runtime=ALL-UNNAMED \
   --add-opens=java.base/java.net=ALL-UNNAMED \
   --add-opens=java.base/java.util=ALL-UNNAMED \
   -jar ./ysoserial-all.jar CommonsCollections4 'rm /home/carlos/morale.txt' | base64
```
Creates malicious serialized data that executes arbitrary command.
Payloads:
* `URLDNS` - performs DNS lookup
* `JRMPClient` is another universal chain that you can use for initial detection. It causes the server to try establishing a TCP connection to the supplied IP address. Note that you need to provide a raw IP address rather than a hostname. This chain may be useful in environments where all outbound traffic is firewalled, including DNS lookups. You can try generating payloads with two different IP addresses: a local one and a firewalled, external one. If the application responds immediately for a payload with a local address, but hangs for a payload with an external address, causing a delay in the response, this indicates that the gadget chain worked because the server tried to connect to the firewalled address. In this case, the subtle time difference in responses can help you to detect whether deserialization occurs on the server, even in blind cases.

#### PHP Generic Gadget Chains
```bash
git clone https://github.com/ambionics/phpggc
```

# Creating your own exploit
#to-be-continued https://portswigger.net/web-security/deserialization/exploiting