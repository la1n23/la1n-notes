
```shell
u@htb[/htb]$ sudo nmap 10.129.14.128 -sV -sC -p3306 --script mysql*
```

```shell-session
u@htb[/htb]$ mysql -u root -pP4SSw0rd -h 10.129.14.128

show databases;

select version();

use mysql; show tables;
```