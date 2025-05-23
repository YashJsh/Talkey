"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = exports.io = void 0;
exports.getReceiverSocketId = getReceiverSocketId;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["https://talkey-lilac.vercel.app"],
    },
});
exports.io = io;
function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}
// Define the userSocketMap with an explicit type
const userSocketMap = {}; // {userId: socketId}
io.on("connection", (socket) => {
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
