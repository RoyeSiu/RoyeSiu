## SocketIO setup


###  install npm
-   [x] install `socket.io`

```
npm install Socket.IO
npm install http

```

###  setup Backend
-   [x] setup `socket.io` (BE)

```ts
import http from "http";
import { Server as SocketIO } from "socket.io";

const server = new http.Server(app);
const io = new SocketIO(server);

io.on("connection", (socket) => {
  console.log(`[INFO] socket: ${socket.id} is connected`); //顯示已連線的ID
});

const PORT = 8088;
// app.listen(PORT, () => {  
server.listen(PORT, () => {     //需要修改  app.listen  為  server.listen
  console.log(`[INFO] listening to port ${PORT}`);
});
```

###  setup Frontend

-   [x] setup `socket.io` (FE)

###   setup html
```html
 <script src="/socket.io/socket.io.js"></script>
```

###   setup js
```js
window.onload = async () => {
    const socket = io.connect()
    }
```

