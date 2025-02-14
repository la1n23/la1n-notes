## Examples
* Redeeming a gift card multiple times
* Rating a product multiple times
* Withdrawing or transferring cash in excess of your account balance
* Reusing a single CAPTCHA solution
* Bypassing an anti-brute-force rate limit
Limit overruns are a subtype of so-called "**time-of-check to time-of-use**" (TOCTOU) flaws. 

## Detecting and exploiting limit overrun race conditions 
* For HTTP/1, it uses the classic last-byte synchronization technique.
* For HTTP/2, it uses the single-packet attack technique, first demonstrated by PortSwigger Research at Black Hat USA 2023.

In another words:
* When sending over HTTP/1, Repeater uses last-byte synchronization. This is where multiple requests are sent over concurrent connections, but the last byte of each request in the group is withheld. After a short delay, these last bytes are sent down each connection simultaneously.
* When sending over HTTP/2+, Repeater sends the group using a single packet attack. This is where multiple requests are sent via a single TCP packet.

![[single tcp packet.png]]

`
turbo intruder:
race-single-packet-attack.py

##### Bypassing rate limits via race conditions
e.g. login with parallel requests in single connnection  and single packet
