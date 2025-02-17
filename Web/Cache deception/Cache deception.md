Attacker sends a malicious link to a victim, then victim visits the link, his/her response is cached, the attacker visits the link and gain unauthorized access to private information.

## Detect cached responses
Headers:
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
Try to add/remove session cookie, add/remove query param.

## Delimiter discrepancies
The goals is to add a delimiter in order to cache the response and pass the server URL validation.
Try both encoded and non-encoded dlimiters.
* Java Sprint uses ;
* RoR uses .
* OpenLiteSpeed uses %00
Delimiters payload for intruder: https://portswigger.net/web-security/web-cache-deception/wcd-lab-delimiter-list

## Static directory cache rules
`/static`, `/assets`, `/scripts`, or `/images`
Try [[path traversal]] like `/aaa/..%2fprofile`:
	* if response is successfull, the server decodes the slash and resolves the dot-segment.
	* otherwise, `/aaa/..%2fprofile` is enterpreted as is.`
Template to test:
`/<static-directory-prefix>/..%2f<dynamic-path>`
example:
`/static/..%2f/profile`

