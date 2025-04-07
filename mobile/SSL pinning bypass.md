# Using frida script
```bash
frida -U --codeshare pcipolloni/universal-android-ssl-pinning-bypass-with-frida -n Boosty

frida --codeshare akabe1/frida-multiple-unpinning -U -n Boosty

frida -U --codeshare sowdust/universal-android-ssl-pinning-bypass-2 -n Boosty
```

# Patching apk
```bash
pip install

objection patchapk --source base.apk
```