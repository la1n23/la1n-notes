Attacker sends a malicious link to a victim, then victim visits the link, his/her response is cached, the attacker visits the link and gain unauthorized access to private information.

## Detect cached responses
Headers:
* X-Cache: hit - The response was served from the cache.
* X-Cache: miss - The cache did not contain a response for the request's key, so it was fetched from the origin server. In most cases, the response is then cached. To confirm this, send the request again to see whether the value updates to hit.
* X-Cache: dynamic - The origin server dynamically generated the content. Generally this means the response is not suitable for caching.
* X-Cache: refresh - The cached content was outdated and needed to be refreshed or revalidated.
* Cache-Control: public and max-age >0

## Exploiting static extension cache rules

#### Exploiting path mapping discrepancies
Identify a cached response. Usually a static file.
Try to add file extension to the URL: `/api/orders/1234.jpg`
Try different file extensions.
Try to add/remove session cookie, add/remove query param.