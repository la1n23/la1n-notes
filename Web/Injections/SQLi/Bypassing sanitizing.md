[[sanitizing]] #sql #xml [[SQLi]]
For XML:
`<storeId>999 &#x53;ELECT * FROM information_schema.tables</storeId>`
#### Character Encoding  
Character encoding involves converting special characters in the SQL injection payload into encoded forms that may bypass input filters.  

- **URL Encoding**: URL encoding is a common method where characters are represented using a percent (%) sign followed by their ASCII value in hexadecimal. For example, the payload `' OR 1=1--` can be encoded as `%27%20OR%201%3D1--`. This encoding can help the input pass through web application filters and be decoded by the database, which might not recognise it as malicious during initial processing.
- **Hexadecimal Encoding**: Hexadecimal encoding is another effective technique for constructing SQL queries using hexadecimal values. For instance, the query `SELECT * FROM users WHERE name = 'admin'` can be encoded as `SELECT * FROM users WHERE name = 0x61646d696e`. By representing characters as hexadecimal numbers, the attacker can bypass filters that do not decode these values before processing the input.
- `Unicode Encoding`: Unicode encoding represents characters using Unicode escape sequences. For example, the string `admin` can be encoded as `\u0061\u0064\u006d\u0069\u006e`. This method can bypass filters that only check for specific ASCII characters, as the database will correctly process the encoded input.

https://gchq.github.io/CyberChef/

#### No-Quote SQL Injection  
No-Quote SQL injection techniques are used when the application filters single or double quotes or escapes.  

- **Using Numerical Values**: One approach is to use numerical values or other data types that do not require quotes. For example, instead of injecting `' OR '1'='1`, an attacker can use `OR 1=1` in a context where quotes are not necessary. This technique can bypass filters that specifically look for an escape or strip out quotes, allowing the injection to proceed.
- **Using SQL Comments**: Another method involves using SQL comments to terminate the rest of the query. For instance, the input `admin'--` can be transformed into `admin--`, where the `--` signifies the start of a comment in SQL, effectively ignoring the remainder of the SQL statement. This can help bypass filters and prevent syntax errors.
- **Using CONCAT() Function**: Attackers can use SQL functions like `CONCAT()` to construct strings without quotes. For example, `CONCAT(0x61, 0x64, 0x6d, 0x69, 0x6e)` constructs the string admin. The `CONCAT()` function and similar methods allow attackers to build strings without directly using quotes, making it harder for filters to detect and block the payload.

#### No Spaces Allowed
When spaces are not allowed or are filtered out, various techniques can be used to bypass this restriction.
- **Comments to Replace Spaces**: One common method is to use SQL comments (`/**/`) to replace spaces. For example, instead of `SELECT * FROM users WHERE name = 'admin'`, an attacker can use `SELECT/**//*FROM/**/users/**/WHERE/**/name/**/='admin'`. SQL comments can replace spaces in the query, allowing the payload to bypass filters that remove or block spaces.  
- **Tab or Newline Characters**: Another approach is using tab (`\t`) or newline (`\n`) characters as substitutes for spaces. Some filters might allow these characters, enabling the attacker to construct a query like `SELECT\t*\tFROM\tusers\tWHERE\tname\t=\t'admin'`. This technique can bypass filters that specifically look for spaces.  
- **Alternate Characters**: One effective method is using alternative URL-encoded characters representing different types of whitespace, such as `%09` (horizontal tab), `%0A` (line feed), `%0C` (form feed), `%0D` (carriage return), and `%A0` (non-breaking space). These characters can replace spaces in the payload.

![[SQLi filter bypass.png]]