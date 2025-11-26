import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());

// create HTTP server

const server = http.createServer(app);

// initialize Socket.io

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", //React app
    methods: ["GET", "POST"],
  },
});

// basic route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Socket.IO Server is running! and fine ",
  });
});

const onlineUsers = new Set();

// Socket.io connection
io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`);

  // socket.emit() => Send message to the person who triggered an event

  socket.on("joinRoom", (userName) => {
    // only the connected user receives this
    socket.emit("welcome", `hi ${userName} welcome to server`);
    onlineUsers.add(userName);
    // console.log("Online users: ",Array.from(onlineUsers));
    console.log("online user set : ", onlineUsers);
    console.log("array of online users :", Array.from(onlineUsers));
  });

  socket.on("sendMessage", ({ userName, msg }) => {
    console.log("Recvied message: ", userName, msg);
    // send message to all clients (including sender)
    io.emit("sendMessage", [`${userName}: ${msg}`]);
  });

  socket.on("getOnlineUser", () => {
    const onlineUser = Array.from(onlineUsers);
    io.emit("getOnlineUser",onlineUser)
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected : ${socket.id}`);
  });
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
