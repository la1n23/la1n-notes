DOM-based link-manipulation vulnerabilities arise when a script writes attacker-controllable data to a navigation target within the current page, such as a clickable link or the submission URL of a form.

Impact:
- Causing the user to be redirected to an arbitrary external URL, which could facilitate a phishing attack.
- Causing the user to submit sensitive form data to a server controlled by the attacker.
- Changing the file or query string associated with a link, causing the user to perform an unintended action within the application.
- Bypassing browser anti-XSS defenses by injecting on-site links containing XSS exploits. This works because anti-XSS defenses do not typically account for on-site links.

Sinks:
```
element.href
element.src
element.action
```

Prevention:
You should avoid allowing data from any untrusted source to dynamically set the target URL for links or forms.