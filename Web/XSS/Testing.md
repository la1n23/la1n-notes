https://github.com/masatokinugawa/filterbypass/wiki/Browser's-XSS-Filter-Bypass-Cheat-Sheet

```
Testing for XSS flow:
* How are “non-malicious” HTML tags such as <h2> handled?
* What about incomplete tags? <iframe src=//zseano.com/c=
* How do they handle encodings such as <%00h2? (There are LOTS to try here, %0d, %0a, %09 etc)
  * Is it just a blacklist of hardcoded strings? Does </script/x> work? <ScRipt> etc.
```
