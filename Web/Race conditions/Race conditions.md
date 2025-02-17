# Examples
* Redeeming a gift card multiple times
* Rating a product multiple times
* Withdrawing or transferring cash in excess of your account balance
* Reusing a single CAPTCHA solution
* Bypassing an anti-brute-force rate limit
Limit overruns are a subtype of so-called "**time-of-check to time-of-use**" (TOCTOU) flaws. 

# Detecting and exploiting limit overrun race conditions 
* For HTTP/1, it uses the classic last-byte synchronization technique.
* For HTTP/2, it uses the single-packet attack technique, first demonstrated by PortSwigger Research at Black Hat USA 2023.

In another words:
* When sending over HTTP/1, Repeater uses last-byte synchronization. This is where multiple requests are sent over concurrent connections, but the last byte of each request in the group is withheld. After a short delay, these last bytes are sent down each connection simultaneously.
* When sending over HTTP/2+, Repeater sends the group using a single packet attack. This is where multiple requests are sent via a single TCP packet.

![[single tcp packet.png]]

`
turbo intruder:
race-single-packet-attack.py

#### Bypassing rate limits via race conditions
e.g. login with parallel requests in single connnection  and single packet

# Multi-step sequences
In details: https://portswigger.net/research/smashing-the-state-machine

### Predict potential collisions
You typically need two or more requests that trigger operations on the same record. For example, consider the following variations of a password reset implementation: 

![[multi-step example.png]]

### Probe for clues
1. Send group of requests in sequence (separate connections)
2. Send group of requests in parallel using single-packet attack (or last-byte for HTTP 1)
3. Look for some form of deviation from what you observed during benchmarking.

### Prove the concept
Remove superfluous requests, and make sure you can still replicate the effects. 

# Multi-endpoint race conditions
Think about the classic logic flaw in online stores where you add an item to your basket or cart, pay for it, then add more items to the cart before force-browsing to the order confirmation page. 

![[multi-endpoint .png]]

### Aligning multi-endpoint race windows
![[multi-endpoint race window.png]]

Common probelms:
* Delays introduced by network architecture
* Delays introduced by endpoint-specific processing 

##### Connection warming
 In Burp Repeater, you can try adding a GET request for the homepage to the start of your tab group, then using the Send group in sequence (single connection) option.

If the first request still has a longer processing time, but the rest of the requests are now processed within a short window, you can ignore the apparent delay and continue testing as normal. 

# Single-endpoint race conditions
Email address confirmations, or any email-based operations, are generally a good target for single-endpoint race conditions. Emails are often sent in a background thread after the server issues the HTTP response to the client, making race conditions more likely. 
Send two requests in parallel in single connection with different payload.

# Time-sensitive attacks
Example. Usage timestamps instead of cryptography to generate secuirity token.
