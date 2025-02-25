##### Proper configuration of cross-origin requests
Use whitelist for `Access-Control-Allow-Origin`, not dynamically reflecting origins and not a wildcard.

##### Avoid whitelisting null
Avoid using the header `Access-Control-Allow-Origin: null`

##### CORS defines only browser behavior
Servers should also be configured properly.