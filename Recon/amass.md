```
amass enum -d ishosting.com -o amass_passive.txt -brute /usr/share/seclists/Discovery/DNS/dns-Jhaddix.txt -ip -o amass.txt -p 80,443,8080

cat amass.txt | sort -u > all_subs.txt

```

config.ini
```
[API_Keys]
Censys_ID = YOUR_ID
Censys_Secret = YOUR_SECRET
SecurityTrails = YOUR_KEY

[resolvers]
1.1.1.1
8.8.4.4
```

