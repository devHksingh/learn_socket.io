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
    origin: "http://localhost:5173/", //React app
    methods: ["GET", "POST"],
  },
});

// basic route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Socket.IO Server is running! and fine ",
  });
});

// Socket.io connection
io.on("connection",(socket)=>{
  console.log(`User connected : ${socket.id}`);
  
  socket.on('disconnect',()=>{
    console.log(`User disconnected : ${socket.id}`);
    
  })
})

const PORT = 4000;

server.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})