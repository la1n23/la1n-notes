Pivoting through SSH
```bash
attacker$ sudo apt install -y sshuttle

# route 172.16.5.0/23 through pivot host
attacker$ sudo sshuttle -r ubuntu@10.129.202.64 172.16.5.0/23 -v 
attacker$ nmap -v -sV -p3389 172.16.5.19 -A -Pn
```


