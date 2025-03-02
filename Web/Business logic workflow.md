TODO: add examples of each attack
#to-be-continued 
https://portswigger.net/web-security/logic-flaws/examples

String truncation on server and email field manipulation:
https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-inconsistent-handling-of-exceptional-input
##### Excessive trust in client-side controls
* Excessive trust in client-side controls
* 2FA broken logic
##### Failing to handle unconventional input
* HIgh-level logic vulnerability
* Low-level logic flaw (e.g. int overflow)
* Inconsistent handling of exceptional input
##### Trusted users won't always remain trustworthy
* Inconsistent security controls
##### Users won't always supply mandatory input
* Weak isolation on dual-use endpoint
* Password reset broken logic
##### Users won't always follow the intended sequence
* 2FA simple bypass
* Insufficient workflow validation
* Auth bypass via flawed state machine
##### Domain-specific flaws
* Flawed enforcement of business rules
* Infinite money logic flaw
##### Providing an encryption oracle
An attacker can use this input to encrypt arbitrary data using the correct algorithm and asymmetric key.
##### Email address parser discrepancies
#encoding 
Encoding email different ways:
abcfoo@ginandjuice.shop

1. **Q encoding which is part of "encoded-word" standard**:
	```
	=?iso-8859-1?q?=61=62=63?=foo@ginandjuice.shop
	```
2. **UTF-8 encoding**:
	=?utf-8?q?=61=62=63?=foo@ginandjuice.shop
3. **UTF-7 encoding**:
	=?utf-7?q?&AGEAYgBj-?=foo@ginandjuice.shop.
Example of bypassing email validation where only @ginandjuice.shop emails accepted:
=?utf-7?q?attacker&AEA-[YOUR-EXPLOIT-SERVER_ID]&ACA-?=@ginandjuice.shop

