"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const getUsersForSidebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    try {
        const loggedUserId = req.user._id;
        const filteredUsers = yield user_modals_1.default.find({
            _id: { $ne: loggedUserId },
        }).select("-password");
        res.status(200).json(filteredUsers);
        return;
    }
    catch (error) {
        console.error("Error in getUsersForSidebar", error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getUsersForSidebar = getUsersForSidebar;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = yield message_model_1.default.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });
        res
            .status(200)
            .json({ message: "Messages fetched successfully", data: messages });
    }
    catch (error) {
        console.log("Error in fetching messages", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getMessages = getMessages;
const sendMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        console.log(receiverId);
        const senderId = req.user._id;
        console.log(senderId);
        let imageUrl;
        if (image) {
            const uploadResponse = yield cloudinary_1.default.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new message_model_1.default({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        yield newMessage.save();
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(receiverId);
        if (receiverSocketId) {
            socket_1.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json({ message: "Message Received", data: newMessage });
    }
    catch (error) {
        console.log("Error in Sending messages", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.sendMessages = sendMessages;
