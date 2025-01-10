import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId : string){
  return userSocketMap[userId];
}


// Define the userSocketMap with an explicit type
const userSocketMap: { [key: string]: string } = {}; // {userId: socketId}

io.on("connection", (socket: Socket) => {
  
  const userId = socket.handshake.query.userId;
  // Ensure userId is a string before using it
  if (typeof userId === 'string') {
    userSocketMap[userId] = socket.id;
  }
  
  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (typeof userId === 'string') {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
