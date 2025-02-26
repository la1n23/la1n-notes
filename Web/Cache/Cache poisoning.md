# Researches
- [Practical Web Cache Poisoning](https://portswigger.net/research/practical-web-cache-poisoning)
- [Web Cache Entanglement: Novel Pathways to Poisoning](https://portswigger.net/research/web-cache-entanglement)

# Attack
1. Identify and evaluate unkeyed inputs
2. Elicit a harmful response from the back-end server
3. Get the response cached
### Identify and evaluate unkeyed inputs
Identify unkeyed inputs manually by adding random inputs to reqests and observing whether or not they have an effect on the response.
#burp comparer could be useful to compare the response with and without the injected input.
##### Param miner
Request -> RMB -> extensions -> param miner -> guess headers.
Results can be found at  Output tab (extensions -> installed -> param miner -> output)

Generating unique cache keys -> Enable cache buster in param miner settings.

