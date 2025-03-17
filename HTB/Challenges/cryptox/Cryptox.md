#HTB/WriteUp/Challenge

1. Register a new account with test@test.com email
2. Look up for JWT token and take a note from KID
3. Replace KID and server host/IP in key.js that will serve j.json file
   * python3 -m http.server 8888
4. node.js key.js
5. Save the first line of the key.js output to j.json on your server
6. The last line is your new forged JWT token
7. Open another private browser window, log in as test@test.com, replace JWT token with the forged one
8. Open dashboard and check if you logged in successfully 
9. From your private window add to friends test@test.com
10. Go to test@test.com browser session, confirm frient request
11. Switch to financial account, choose friend, currency and amount, type 1234 to OTP code and enable interception in burp
12. Replace code in request payload to [0000...9999] from otp.txt file, forward request
13. Go to dashboard form financial account and grab the flag
