# [[john]]
```bash
bitlocker2john -i Backup.vhd > backup.hash
john --wordlist=rockyou.txt backup.hash

sudo apt install dislocker
sudo mkdir -p /media/bitlocker
sudo mkdir -p /media/bitlockermount
sudo losetup -f -P Backup.vhd
sudo dislocker /dev/loop0p2 -u123456789! -- /media/bitlocker
sudo mount -o loop /media/bitlocker/dislocker-file /media/bitlockermount
``