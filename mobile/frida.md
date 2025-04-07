https://codeshare.frida.re/@pcipolloni/universal-android-ssl-pinning-bypass-with-frida/

First off, download the latest frida-server for Android from our releases page and uncompress it.
https://github.com/frida/frida/releases

```
adb shell getprop ro.product.cpu.abilist # check your device cpu type

# install frida-server on android
wget https://github.com/frida/frida/releases/download/16.7.7/frida-server-16.7.7-android-x86_64.xz
unxz frida-server.xz
adb root # might be required
adb push frida-server /data/local/tmp/
adb shell "chmod 755 /data/local/tmp/frida-server"
adb shell "/data/local/tmp/frida-server &"

adb -s emulator-5554 forward tcp:27042 tcp:27042
adb -s emulator-5554 forward tcp:27043 tcp:27043

❯ adb shell 
emu64xa:/ $ su
emu64xa:/ # getenforce
Enforcing
emu64xa:/ # setenforce 0


# local deps
# Install Brida Burp extension
pip install frida-tools Pyro4
npm install frida-compile

sudo sysctl kernel.yama.ptrace_scope=0


❯ frida-ls-devices
Id                Type    Name                   OS
----------------  ------  ---------------------  ---------------
local             local   Local System           Fedora Linux 41
SCCQONBE8PXSORZX  usb     23129RN51X             Android 14
emulator-5554     usb     Android Emulator 5554  Android 16
barebone          remote  GDB Remote Stub
socket            remote  Local Socket

frida-ps -D emulator-5554 -U
```

