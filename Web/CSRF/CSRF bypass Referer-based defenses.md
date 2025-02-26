## Validation of Referer depends on header being present
Some apps validate `Referer` header when it is present in requests but skip the validation if the header is omitted.
Easiest way to drop the `Referer` header is using a META tag within the page that hosts the CSRF attack:
```html
<meta name="referrer" content="never">
```

## Validation of Referer can be circumvented
Naive validation like only domain check
If browser strips query params from the referer by default, you can override this behavior by making sure that the response containing your exploit has the `Referrer-Policy: unsafe-url` header