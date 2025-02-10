#php
#java
#asp
[[LFI]]
[[RFI]]
#FI
## PHP
```PHP
if (isset($_GET['language'])) {
    include($_GET['language']);
}
```

* `include_once()`
* `require()`
* `require_once()`
* `file_get_contents()`

## NodeJS
```javascript
if(req.query.language) {
    fs.readFile(path.join(__dirname, req.query.language), function (err, data) {
        res.write(data);
    });
}
```

```js
app.get("/about/:language", function(req, res) {
    res.render(`/${req.params.language}/about.html`);
});
```

## Java
```jsp
<c:if test="${not empty param.language}">
    <jsp:include file="<%= request.getParameter('language') %>" />
</c:if>
```

## .NET
```cs
@if (!string.IsNullOrEmpty(HttpContext.Request.Query['language'])) {
    <% Response.WriteFile("<% HttpContext.Request.Query['language'] %>"); %> 
}
```

```cs
@Html.Partial(HttpContext.Request.Query['language'])
```

```cs
<!--#include file="<% HttpContext.Request.Query['language'] %>"-->
```

