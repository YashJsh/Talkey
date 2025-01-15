"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessages = exports.getMessages = exports.getUsersForSidebar = void 0;
const db_1 = require("../lib/db");
const user_modals_1 = __importDefault(require("../models/user.modals"));
const message_model_1 = __importDefault(require("../models/message.model"));
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const socket_1 = require("../lib/socket");
const getUsersForSidebar = async (req, res) => {
    await (0, db_1.connectDB)();
    try {
        const loggedUserId = req.user._id;
        const filteredUsers = await user_modals_1.default.find({
            _id: { $ne: loggedUserId },
        }).select("-password");
        res.status(200).json(filteredUsers);
        return;
    }
    catch (error) {
        console.error("Error in getUsersForSidebar", error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.getUsersForSidebar = getUsersForSidebar;
const getMessages = async (req, res) => {
    await (0, db_1.connectDB)();
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await message_model_1.default.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });
        res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error in fetching messages", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getMessages = getMessages;
const sendMessages = async (req, res) => {
    await (0, db_1.connectDB)();
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary_1.default.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new message_model_1.default({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        await newMessage.save();
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(receiverId);
        if (receiverSocketId) {
            socket_1.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in Sending messages", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.sendMessages = sendMessages;
