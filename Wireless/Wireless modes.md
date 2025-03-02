
# Ad-hoc Mode
todo

# Master (hotspot)
vi open.conf:
```
interface=wlan0
driver=nl80211
ssid=HTB-Hello-World
channel=2
hw_mode=g
```

```bash
sudo hostapd open.conf
```

# Mesh mode
```bash
sudo iw dev wlan0 set type mesh
```

# Monitor mode:
```bash
sudo ip link set wlp61s0 down
sudo iw dev wlp61s0 set type monitor
sudo ip link set wlp61s0 up
```