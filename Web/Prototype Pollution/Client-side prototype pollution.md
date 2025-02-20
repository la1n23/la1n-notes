## Finding client-side prototype pollution sources manually
1. Try to inject an arbitrary property via the query string, URL fragment, and any JSON input. For example:
    `vulnerable-website.com/?__proto__[foo]=bar`
2. In your browser console, inspect `Object.prototype` to see if you have successfully polluted it with your arbitrary property:
    `Object.prototype.foo // "bar" indicates that you have successfully polluted the prototype // undefined indicates that the attack was not successful`
3. If the property was not added to the prototype, try using different techniques, such as switching to dot notation rather than bracket notation, or vice versa:
    `vulnerable-website.com/?__proto__.foo=bar`
4. Repeat this process for each potential source.

https://portswigger.net/burp/documentation/desktop/tools/dom-invader/prototype-pollution#detecting-sources-for-prototype-pollution

## Finding client-side prototype pollution gadgets manually
Once you've [identified a source](https://portswigger.net/web-security/prototype-pollution/client-side#finding-client-side-prototype-pollution-sources-manually) that lets you add arbitrary properties to the global `Object.prototype`, the next step is to find a suitable gadget that you can use to craft an exploit. In practice, we recommend [using DOM Invader](https://portswigger.net/web-security/prototype-pollution/client-side#finding-client-side-prototype-pollution-gadgets-using-dom-invader) to do this, but it's useful to look at the manual process as it may help solidify your understanding of the vulnerability.

1. Look through the source code and identify any properties that are used by the application or any libraries that it imports.
2. In Burp, enable response interception (**Proxy > Options > Intercept server responses**) and intercept the response containing the JavaScript that you want to test.
3. Add a `debugger` statement at the start of the script, then forward any remaining requests and responses.
4. In Burp's browser, go to the page on which the target script is loaded. The `debugger` statement pauses execution of the script.
5. While the script is still paused, switch to the console and enter the following command, replacing `YOUR-PROPERTY` with one of the properties that you think is a potential gadget:
    `Object.defineProperty(Object.prototype, 'YOUR-PROPERTY', { get() { console.trace(); return 'polluted'; } })`
    The property is added to the global `Object.prototype`, and the browser will log a stack trace to the console whenever it is accessed.
6. Press the button to continue execution of the script and monitor the console. If a stack trace appears, this confirms that the property was accessed somewhere within the application.
7. Expand the stack trace and use the provided link to jump to the line of code where the property is being read.
8. Using the browser's debugger controls, step through each phase of execution to see if the property is passed to a sink, such as `innerHTML` or `eval()`.
9. Repeat this process for any properties that you think are potential gadgets.
## Finding client-side prototype pollution gadgets using DOM Invader

As you can see from the previous steps, manually identifying prototype pollution gadgets in the wild can be a laborious task. Given that websites often rely on a number of third-party libraries, this may involve reading through thousands of lines of minified or obfuscated code, which makes things even trickier. DOM Invader can automatically scan for gadgets on your behalf and can even generate a DOM XSS proof-of-concept in some cases. This means you can find exploits on real-world sites in a matter of seconds rather than hours.

For more information, check out [Scanning for prototype pollution gadgets with DOM Invader](https://portswigger.net/burp/documentation/desktop/tools/dom-invader/prototype-pollution#scanning-for-prototype-pollution-gadgets).

## Prototype pollution via the constructor
#to-be-continued 
https://portswigger.net/web-security/prototype-pollution/client-side#prototype-pollution-via-the-constructor