
* Files for search engines: robots.txt and sitemap.xml
* Directory listening
* Comments
* Error messages
* Debug messages
* Backup files
* .git files [[git]]

##### Wordpress xmlrpc pingback.ping method
* IP Disclosure - An attacker can call the pingback.ping method on a WordPress instance behind Cloudflare to identify its public IP. The pingback should point to an attacker-controlled host (such as a VPS) accessible by the WordPress instance.
* Cross-Site Port Attack (XSPA) - An attacker can call the pingback.ping method on a WordPress instance against itself (or other internal hosts) on different ports. Open ports or internal hosts can be identified by looking for response time differences or response differences.
* Distributed Denial of Service Attack (DDoS) - An attacker can call the pingback.ping method on numerous WordPress instances against a single target.

[[wordpress]]