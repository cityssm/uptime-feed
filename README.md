# Uptime Feed

![JSON Output](docs/json.png)

RSS and JSON application startup notifications, useful for informally notifying affected users of unexpected server restarts.

## Why?

Sometimes the application support team are the last ones to hear about unexpected server restarts.
It's not the fault of the busy systems administrators responding to the problem,
but finding out about server problems sooner helps everyone.

## What Does it Do?

This simple application runs on a server, preferably as a service that starts with the server.
It hosts an RSS Feed (and a JSON response, if that's your preference)
with the last time the application was started.

If the server restarts, the timestamp will change, resulting in a new notification.

