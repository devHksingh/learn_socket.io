# Implementing webSocket for dummy chat app using socket.io library

Backend: Node.js with Express and Socket.io

Frontend: HTML, CSS, JavaScript with Socket.io client library

## Baisc working of Socket.io

### what is difference between io and socket?

**io** = server-wide connection manager
Controlls all connected clients
Can broadcast message to everyone
Can broadcast to rooms
Can list all sockets
Lives on the server only

```js
io.emit("event",data)

```

**Sends to everyone connected**

**socket** = one specific client
the current user
thier connection
thier ID
their events

```js
socket.emit("event", data)


```

**Sends a message only to that one client**
