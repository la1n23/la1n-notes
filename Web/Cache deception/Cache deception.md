Attacker sends a malicious link to a victim, then victim visits the link, his/her response is cached, the attacker visits the link and gain unauthorized access to private information.

## Detect cached responses
[[headers]]:
* X-Cache: hit - The response was served from the cache.
* X-Cache: miss - The cache did not contain a response for the request's key, so it was fetched from the origin server. In most cases, the response is then cached. To confirm this, send the request again to see whether the value updates to hit.
* X-Cache: dynamic - The origin server dynamically generated the content. Generally this means the response is not suitable for caching.
* X-Cache: refresh - The cached content was outdated and needed to be refreshed or revalidated.
* Cache-Control: public and max-age >0

## Exploiting static extension cache rules

## Exploiting path mapping discrepancies
Identify a cached response. Usually a static file.
Try to add file extension to the URL: `/api/orders/1234.jpg`
Try different file extensions.
Try to add/remove session cookie, add/remove query parameters.

## Delimiter discrepancies
The goals is to add a delimiter in order to cache the response and pass the server URL validation.
Try both encoded and non-encoded delimiters.
* Java Sprint uses ;
* RoR uses .
* OpenLiteSpeed uses %00
Delimiters payload for intruder: https://portswigger.net/web-security/web-cache-deception/wcd-lab-delimiter-list

## Static directory cache rules
`/static`, `/assets`, `/scripts`, or `/images`
Try [[path traversal]] like `/aaa/..%2fprofile`:
	* if response is successful, the server decodes the slash and resolves the dot-segment.
	* otherwise, `/aaa/..%2fprofile` is interpreted as is.`
Template to test:
`/<static-directory-prefix>/..%2f<dynamic-path>`
example:
`/static/..%2f/profile`

## Detecting URL normalization by the origin server
Look for a non-idempotent method like `POST`. For example, modify `/profile` to `/aaa/..%2fprofile`:
* If the response matches the base response and returns the profile information, this indicates that the path has been interpreted as `/profile`. The origin server decodes the slash and resolves the dot-segment.
* If the response doesn't match the base response, for example returning a `404` error message, this indicates that the path has been interpreted as `/aaa/..%2fprofile`. The origin server either doesn't decode the slash or resolve the dot-segment.

## Detecting URL normalization by the cache server
Choose a request with a response that contains evidence of being cached. For example, `/aaa/..%2fassets/js/stockCheck.js`
- If the response is no longer cached, this indicates that the cache isn't normalizing the path before mapping it to the endpoint. It shows that there is a cache rule based on the `/assets` prefix.
- If the response is still cached, this may indicate that the cache has normalized the path to `/assets/js/stockCheck.js`.

You can also add a path traversal sequence after the directory prefix. For example, modify `/assets/js/stockCheck.js` to `/assets/..%2fjs/stockCheck.js`:

- If the response is no longer cached, this indicates that the cache decodes the slash and resolves the dot-segment during normalization, interpreting the path as `/js/stockCheck.js`. It shows that there is a cache rule based on the `/assets` prefix.
- If the response is still cached, this may indicate that the cache hasn't decoded the slash or resolved the dot-segment, interpreting the path as `/assets/..%2fjs/stockCheck.js`

## Exploiting normalization by the origin server
Origin resolves dot-segments, the cache doesn't
`/<static-directory-prefix>/..%2f<dynamic-path>`

For example, consider the payload `/assets/..%2fprofile`:
- The cache interprets the path as: `/assets/..%2fprofile`
- The origin server interprets the path as: `/profile`

## Exploiting normalization by the cache server
If the cache server resolves encoded dot-segments but the origin server doesn't, you can attempt to exploit the discrepancy by constructing a payload according to the following structure:
`/<dynamic-path>%2f%2e%2e%2f<static-directory-prefix>`

When exploiting normalization by the cache server, encode all characters in the path traversal sequence.

For example, consider how the cache and origin server interpret the payload `/profile%2f%2e%2e%2fstatic`:
- The cache interprets the path as: `/static`
- The origin server interprets the path as: `/profile%2f%2e%2e%2fstatic`

To exploit this discrepancy, you'll need to also identify a delimiter that is used by origin server. Test possible delimiters by adding them to payload after the dynamic path:
- If the origin server uses a delimiter, it will truncate the URL path and return the dynamic information.
- If the cache doesn't use the delimiter, it will resolve the path and cache the response.

Example  `/profile;%2f%2e%2e%2fstatic` Origin uses `;` as delimiter:
* The cache interprets the path as: `/static`
* The origin server interprets the path as: `/profile`

## Exploiting file name cache rules
Try different files like `robots.txt`, `index.html`, and `favicon.ico` and check if the response is cached.
#### Detecting normalization discrepancies
Same method as [[Cache deception#Detecting URL normalization by the origin server]]
Example:  `/aaa%2f%2e%2e%2findex.html`
* If the response is cached, this indicates that the cache normalizes the path to `/index.html`
* If the response isn't cached, this indicates that the cache doesn't decode the slash and resolve the dot-segment, interpreting the path as `/profile%2f%2e%2e%2findex.html`
Exploiting same as [[Cache deception#Exploiting normalization by the cache server]]

## Prevention
* Always use `Cache-Control` headers to mark dynamic resources, set with the directives `no-store` and `private`
* Configure your CDN settings so that your caching rules don't override the `Cache-Control` header.
* Many CDNs enable you to set a cache rule that verifies that the response `Content-Type` matches the request's URL file extension. For example, Cloudflare's Cache Deception Armor. #cloudflare
* Verify that there aren't any discrepancies between how the origin server and the cache interpret URL paths.