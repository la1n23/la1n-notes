Vulnerability example:
```javascript
document.cookie = 'cookieName='+location.hash.slice(1);
```

Exploit example:

```html
<iframe src="https://0a3900e80493ddf480b4d07e008400e1.web-security-academy.net/product?productId=1&'><script>print()</script>" onload="if(!window.x)this.src='https://0a3900e80493ddf480b4d07e008400e1.web-security-academy.net';window.x=1;">
```

1. Notice that the home page uses a client-side cookie called `lastViewedProduct`, whose value is the URL of the last product page that the user visited.
2. Go to the exploit server and add the following `iframe` to the body, remembering to replace `YOUR-LAB-ID` with your lab ID:
3. Store the exploit and deliver it to the victim.

The original source of the `iframe` matches the URL of one of the product pages, except there is a JavaScript payload added to the end. When the `iframe` loads for the first time, the browser temporarily opens the malicious URL, which is then saved as the value of the `lastViewedProduct` cookie. The `onload` event handler ensures that the victim is then immediately redirected to the home page, unaware that this manipulation ever took place. While the victim's browser has the poisoned cookie saved, loading the home page will cause the payload to execute.

## Sink
`document.cookie`

## Impact
* Unintended actions
* [[Session fixation]]
* attack on any other websites under the same parent domain

