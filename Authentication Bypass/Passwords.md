[[wordlist]]
##### Filter by pattern
1 uppercase, 1 lowercase, 1 digit and length of 12
```bash
grep '[[:upper:]]' rockyou.txt | grep '[[:lower:]]' | grep '[[:digit:]]' | grep -E '.{12}' > pwds.txt
```