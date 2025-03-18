![[Pasted image 20250121071438.png]]


https://book.hacktricks.wiki/en/pentesting-web/ldap-injection.html
#### Testing if injections is presented
Try adding on of these symbols
```
()*
```

#### Search Queries

An LDAP search query consists of several components, each serving a specific function in the search operation:

1. **Base DN (Distinguished Name):** This is the search's starting point in the directory tree.
2. **Scope:** Defines how deep the search should go from the base DN. It can be one of the following:
    - `base` (search the base DN only),
    - `one` (search the immediate children of the base DN),
    - `sub` (search the base DN and all its descendants).
3. **Filter:** A criteria entry must match to be returned in the search results. It uses a specific syntax to define these criteria.
4. **Attributes:** Specifies which characteristics of the matching entries should be returned in the search results.

Examples:
```
(base DN) (scope) (filter) (attributes)
```

```
(&(objectClass=user)(|(cn=John*)(cn=Jane*)))
```

### Common Attack Vectors
1. **Authentication Bypass:** Modifying LDAP authentication queries to log in as another user without knowing their password.
2. **Unauthorized Data Access:** Altering LDAP search queries to retrieve sensitive information not intended for the attacker's access.
3. **Data Manipulation:** Injecting queries that modify the LDAP directory, such as adding or modifying user attributes.

### Authentication Bypass Techniques

```
(&(uid=*)(|(&)(userPassword=pwd)))

(&(user=*)(password=*)(&))
```


