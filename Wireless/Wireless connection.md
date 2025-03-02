# WEP
wep.conf
```
network={
	ssid="HackTheBox"
    key_mgmt=NONE
    wep_key0=3C1C3A3BAB
    wep_tx_keyidx=0
}
```
```bash
sudo wpa_supplicant -c wep.conf -i wlan0
sudo dhclient wlan0
ifconfig wlan0
```

# WPA
wpa.conf
```
network={
	ssid="HackMe"
    psk="password123"
	key_mgmt=SAE
}
```
key_mgmt is only for WPA3
```bash
sudo wpa_supplicant -c wpa.conf -i wlan0
sudo dhclient wlan0 -r
sudo dhclient wlan0 
ifconfig wlan0
```

# WPA Enterprise
enterprise.conf
```
network={
  ssid="HTB-Corp"
  key_mgmt=WPA-EAP
  identity="HTB\Administrator"
  password="Admin@123"
}
```
```bash
sudo wpa_supplicant -c wpa_enterprsie.conf -i wlan0
sudo dhclient wlan0 -r
sudo dhclient wlan0 
ifconfig wlan0
```

# Network manager CLI UI
```bash
sudo nmtui
```
