##### Filter by pattern
1 uppercase, 1 lowercase, 1 digit and length of 12
```bash
grep '[[:upper:]]' rockyou.txt | grep '[[:lower:]]' | grep '[[:digit:]]' | grep -E '.{12}' > pwds.txt
```
#### Default creds
https://github.com/ihebski/DefaultCreds-cheat-sheet
```bash
pip3 install defaultcreds-cheat-sheet
creds search tomcat
```
#### Password generation
[[hashcat]]

#### Password Policy
Security standards:
* https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63b.pdf
* https://www.cisecurity.org/insights/white-papers/cis-password-policy-guide
* https://www.pcisecuritystandards.org/document_library?category=pcidss&document=pci_dss
##### Examples of policy:
Required:
- Minimum of 8 characters.
- Include uppercase and lowercase letters.
- Include at least one number.
- Include at least one special character.
- It should not be the username.
- It should be changed every 60 days.
Blacklisted:
- Company's name
- Common words associated with the company
- Names of months
- Names of seasons
- Variations on the word welcome and password
- Common and guessable words such as password, 123456, and abcde

#### Password generator
https://1password.com/password-generator
##### Check password strength
https://www.passwordmonster.com/