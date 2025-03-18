oauth misconfiguration leads to accounting squatting
hackerone.com/reports/1074047

1. register new account
2. do not confirm it by link in email
3. try to connect facebook/google with oauth
4. sucessfully connected without entering password at all

privacy concertn
image/foc/file - accessed by other user

auth bypass due to error in logic flow
try to replace the response of failed login with success login response (i.e. old cookies not reset and work interchangebly for different users)

essential cookies as session without 'http only' or 'secure' flag is BUG

delete account without password bug

failure to invalidate session on password reset/change

exif geolocation

clickjacking
check if the website could be loaded within an iframe

try to buy something without login

change email, try to to use forget password token of the previous email (after changing email all tokens including session and reset password must be expired)

iframe injection to ssrf

hyperlink email injection 

stored xss in pdf