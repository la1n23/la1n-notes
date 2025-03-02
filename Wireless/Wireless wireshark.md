# Filters
1. Beacon Frames
```
(wlan.fc.type == 0) && (wlan.fc.type_subtype == 8)
```
2.  Probe Request and Response 
```
(wlan.fc.type == 0) && (wlan.fc.type_subtype == 4)

(wlan.fc.type == 0) && (wlan.fc.type_subtype == 5)
```
3.  Authentication Request and Response 
```
(wlan.fc.type == 0) && (wlan.fc.type_subtype == 11)
```
After the authentication process is complete, the station's association request
```
(wlan.fc.type == 0) && (wlan.fc.type_subtype == 0)
```
4.  Association Response 
```
(wlan.fc.type == 0) && (wlan.fc.type_subtype == 1)
```

If the example network uses WPA2, the EAPOL (handshake) frames
```
eapol
```

Once the connection process is complete, the termination of the connection can be viewed by identifying which party (client or access point) initiated the disconnection. This can be done using the following Wireshark filter to capture Disassociation frames (10) or Deauthentication frames (12).
```
(wlan.fc.type == 0) && (wlan.fc.type_subtype == 12) or (wlan.fc.type_subtype == 10)
```