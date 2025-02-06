iServer-Side Includes (SSI) is a technology web applications use to create dynamic content on HTML pages. SSI is supported by many popular web servers such as Apache and IIS. The use of SSI can often be inferred from the file extension. Typical file extensions include .shtml, .shtm, and .stm

Examples:
```ssi
<!--#name param1="value1" param2="value" -->
```

```ssi
<!--#printenv -->
```

Config:
```ssi
<!--#config errmsg="Error!" -->
```

Echo variables:
```ssi
<!--#echo var="DOCUMENT_NAME" var="DATE_LOCAL" -->
```

Exec:
```ssi
<!--#exec cmd="whoami" -->
```

Include file:
```ssi
<!--#include virtual="index.html" -->
```

