import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server,{
  cors:{
    origin:"*"
  }
});

io.on("connection", (socket) => {
  console.log("a user is connected",socket);
  console.log("*********Socket ID***********");
  console.log("SOCKET ID : ",socket.id);
  
  
});

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

server.listen(4600, () => {
  console.log("server running at localhost 4600");
});
