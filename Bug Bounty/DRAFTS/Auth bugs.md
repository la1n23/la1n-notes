# Login form
1. Brute-force: captcha, can it be bypassed, race conditions, rate limiting (and block after a while), ip block, default creds
2. Test different login/pwd:
	1. password: %2e or %00
	2. fuzzing
3. test secure cookie: httponly, secure, samesite=lax
4. otp
	1. lifetime
	2. invalidation after N tries
	3. rate limiting on sending and checking code
	4. is code connected to specific device
5. 2fa
	1. can it be pypassed in case we have already a token
	2. mass assigment: need_auth=false in login payload
6. email change or password reset without password confirmation	
