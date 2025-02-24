Prototype pollution is a JavaScript vulnerability that enables an attacker to add arbitrary properties to global object prototypes, which may then be inherited by user-defined objects. 

- A prototype pollution source - This is any input that enables you to poison prototype objects with arbitrary properties.
- A sink - In other words, a JavaScript function or DOM element that enables arbitrary code execution.
- An exploitable gadget - This is any property that is passed into a sink without proper filtering or sanitization.

## Prototype pollution sources
- The URL via either the query or fragment string (hash)
- JSON-based input
- Web messages
## Prototype pollution sinks
A prototype pollution sink is essentially just a JavaScript function or DOM element that you're able to access via prototype pollution, which enables you to execute arbitrary JavaScript or system commands

## Prototype pollution gadgets
A gadget provides a means of turning the prototype pollution vulnerability into an actual exploit. This is any property that is:
- Used by the application in an unsafe way, such as passing it to a sink without proper filtering or sanitization.
- Attacker-controllable via prototype pollution. In other words, the object must be able to inherit a malicious version of the property added to the prototype by an attacker.

## Prevention
https://portswigger.net/web-security/prototype-pollution/preventing