First off, download the latest frida-server for Android from our releases page and uncompress it.
```
adb shell getprop ro.product.cpu.abilist # check your device cpu type

# install frida-server on android
unxz frida-server.xz
adb root # might be required
adb push frida-server /data/local/tmp/
adb shell "chmod 755 /data/local/tmp/frida-server"
adb shell "/data/local/tmp/frida-server &"

adb -s emulator-5554 forward tcp:27042 tcp:27042
adb -s emulator-5554 forward tcp:27043 tcp:27043

# local deps
# Install Brida Burp extension
pip install frida-tools Pyro4
npm install frida-compile

# set path to frida-compile in burp ext settings
```

