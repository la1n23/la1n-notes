# Draft
# Root emulator
https://advaitsaravade.me/rooting-an-android-emulator-in-2025/
# Install frida-server on emulator
https://magiskzip.com/how-to-install-frida-on-android-using-magisk/
# Forward ports
```
❯ adb forward tcp:27042 tcp:27042
❯ adb forward tcp:27043 tcp:27043
```
# Setting up proxy
```
❯ adb push ~/Downloads/cacert.der /sdcard/ 

❯ adb shell settings put global http_proxy 127.0.0.1:8080
```
## Convert bupr cert from der to crt format
https://certificatetool.com/ssl-converter/der/der-to-crt
```bash
mv ~/Downloads/certificate.crt ~/Downloads/cert-der.crt 
adb push ~/Downloads/cert-der.crt /data/local/tmp 
frida -U -f [Target Packages] -l fridascript.js

```
#TODO


❯ sudo modprobe kvm_intel kvm kvm_amd
❯ emulator -avd Pixel_8_API_36 -wipe-data -partition-size 4004
