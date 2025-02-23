WebSocket-URL poisoning occurs when a script uses controllable data as the target URL of a WebSocket connection
Sinks:
The `WebSocket` constructor can lead to WebSocket-URL poisoning vulnerabilities.
## Prevention
You should avoid allowing data from any untrusted source to dynamically set the target URL of a WebSocket connection.