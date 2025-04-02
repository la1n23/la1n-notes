If use in docker group, its essentially means he has root access without password required:
```bash
docker run -v /root:/mnt -it alpine
```

LXC / LXD
LXD is similar to Docker and is Ubuntu's container manager. Upon installation, all users are added to the LXD group. Membership of this group can be used to escalate privileges by creating an LXD container, making it privileged, and then accessing the host file system at /mnt/root. 

