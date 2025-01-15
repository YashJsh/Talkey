"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const databaseUrl = process.env.DATABASE_URI;
        if (!databaseUrl) {
            throw new Error("DATABASE_URI is not defined");
        }
        await mongoose_1.default.connect(databaseUrl);
    }
    catch (error) {
        console.log("MongoDB connection error:", error);
    }
};
exports.connectDB = connectDB;
