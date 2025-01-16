"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    senderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    receiverId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    text: {
        type: String
    },
    image: {
        type: String
    },
}, { timestamps: true });
const messageModel = mongoose_1.default.model("Message", MessageSchema);
exports.default = messageModel;
