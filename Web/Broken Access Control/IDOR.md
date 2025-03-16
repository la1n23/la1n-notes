https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References

https://www.owasp.org/index.php/Testing_for_Insecure_Direct_Object_References_(OTG-AUTHZ-004)

https://www.owasp.org/index.php/Top_10-2017_A5-Broken_Access_Control

https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html

https://www.owasp.org/index.php/Top_10_2013-A4-Insecure_Direct_Object_References

http://cwe.mitre.org/data/definitions/639.html
### IDOR vulnerability with direct reference to database objects
https://insecure-website.com/customer_account?customer_number=132355

### IDOR vulnerability with direct reference to static files
https://insecure-website.com/static/12144.txt

## Use interger instead of string
https://test.com/posts/guid-id-here-is
 ->
https://test.com/posts/1234


## Inject id field to payload
```json
{
	"name": "John",
	"email": "john@email.com"
}
```
->
```json
{
	"name": "John",
	"email": "john@email.com",
	"id": 1
}
```