```bash
# Listing Available Interfaces
sudo tcpdump -D

# Choosing an Interface to Capture From
sudo tcpdump -i enp0s20f0u1

# No name resolution
sudo tcpdump -i enp0s20f0u1 -nn

# Display the Ethernet Header - Timestamp and the source MAC Address of the host
sudo tcpdump -i enp0s20f0u1 -e

# Show packet as hex and ascii 
sudo tcpdump -i enp0s20f0u1 -X

# save to file
sudo tcpdump -i enp0s20f0u1 -w ~/output.pcap

# read from file
sudo tcpdump -Xr ~/output.pcap
```
# Filters
```bash
sudo tcpdump -i enp0s20f0u1 host 172.16.146.2

sudo tcpdump -i enp0s20f0u1 host src 172.16.146.2

sudo tcpdump -i enp0s20f0u1 tcp tcp port 80
sudo tcpdump -i enp0s20f0u1 tcp src port 80
sudo tcpdump -i enp0s20f0u1 portrange 0-1024

sudo tcpdump -i enp0s20f0u1 dest net 172.16.146.0/24

# udp/tcp/icmp
sudo tcpdump -i enp0s20f0u1 udp

# proto number
sudo tcpdump -i enp0s20f0u1 proto 7

# less/greater
# size in bytes
sudo tcpdump -i enp0s20f0u1 less 64

# and/or
sudo tcpdump -i enp0s20f0u1 host 192.168.0.1 and port 23
sudo tcpdump -i enp0s20f0u1 not icmp

# look for SYN flags
sudo tcpdump -i enp0s20f0u1 'tcp[13] &2 != 0'

#   SYN: Flags [S]
#   SYN-ACK: Flags [S.]
#   ACK: Flags [.]

```