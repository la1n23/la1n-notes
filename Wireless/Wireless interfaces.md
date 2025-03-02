```bash
sudo iw list

sudo iw dev wlp61s0 info

sudo iw dev wlp61s0 set txpower 15dBm
```

Scan for available network:
```bash
sudo nmcli dev wifi

sudo iw dev wlp61s0 scan | grep -E 'SSID:|signal:|freq:'
```
Outdated `wireless-tools`:
```bash
iwlist wlp61s0 scan |  grep 'Cell\|Quality\|ESSID\|IEEE'
```

Channels:
```bash
sudo iw dev wlp61s0 set channel 6
```

