#remediation

* If your API is not intended for use by the general public, disable introspection on it. Apollo example: https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/#turning-off-introspection-in-production

* If your API is intended for use by the general public then you will likely need to leave introspection enabled. However, you should review the API's schema to make sure that it does not expose unintended fields to the public.

* Make sure that suggestions are disabled. This prevents attackers from being able to use **Clairvoyance** or similar tools to glean information about the underlying schema.  You cannot disable suggestions directly in Apollo. https://github.com/apollographql/apollo-server/issues/3919#issuecomment-836503305 

* Make sure that your API's schema does not expose any private user fields, such as email addresses or user IDs.
#### Preventing GraphQL brute force attacks
[[Brute Force]]
* Limit the query depth of your API's queries

* Configure operation limits such as the maximum number of unique fields, aliases, and root fields that your API can accept.

* Configure the maximum amount of bytes a query can contain.

* Consider implementing cost analysis on your API. Cost analysis is a process whereby a library application identifies the resource cost associated with running queries as they are received. If a query would be too computationally complex to run, the API drops it.

#### Preventing CSRF over GraphQL
[[CSRF]]
* Your API only accepts queries over JSON-encoded POST.
* The API validates that content provided matches the supplied content type.
* The API has a secure CSRF token mechanism.
