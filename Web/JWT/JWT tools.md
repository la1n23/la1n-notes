Should test it, not sure it works correctly
```bash
git clone https://github.com/ticarpi/jwt_tool
python3 -m venv venv && . venv/bin/activate && pip3 install pycryptodomex termcolor requests
# key confusion attack
python jwt_tool.py <token> -T -X k -pk pkey.key
```

Example of algorithm confusion attack in python:
https://blog.x3ric.com/posts/HackTheBox-Under-Construction-Challenge/

