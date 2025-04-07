# Draft

! Make sure host and emulator frida versions match
! Use x86 for emulator
# Root emulator
https://advaitsaravade.me/rooting-an-android-emulator-in-2025/

```bash
emulator -avd Pixel8 -writable-system -no-snapshot-load -selinux permissive

./rootAVD.sh system-images/android-30/google_apis/x86/ramdisk.img
```

# Install frida-server on emulator
https://magiskzip.com/how-to-install-frida-on-android-using-magisk/
or
[[frida]]

# Forward ports
```
❯ adb forward tcp:27042 tcp:27042
❯ adb forward tcp:27043 tcp:27043
```
# Setting up proxy
```bash
❯ adb push ~/Downloads/cacert.der /sdcard/ 
❯ adb shell settings put global http_proxy 127.0.0.1:8080
```

SSL pinning script
https://codeshare.frida.re/@pcipolloni/universal-android-ssl-pinning-bypass-with-frida/
frida -U -n Boosty -l ~/frida.js


Import cert from proxy options from burp and upload:
```
adb push ~/cert-der.crt /data/local/tmp/cert-der.crt
```

working ssl pining script
```
❯ frida -U --codeshare sowdust/universal-android-ssl-pinning-bypass-2 -n Boosty 
```
create proxy burp on 0.0.0.0:8081 and configure wi-fi network to use it


If emulator wont run:
❯ sudo modprobe kvm_intel kvm kvm_amd