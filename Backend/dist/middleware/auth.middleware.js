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
exports.protectedRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_modals_1 = __importDefault(require("../models/user.modals"));
const db_1 = require("../lib/db");
const protectedRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(403).json({ message: "Unauthorized User" });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (JWT_SECRET === undefined) {
            res.status(500).json({ message: "JWT Secret is not defined" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!decoded) {
            res.status(403).json({ message: "Unauthorized User" });
            return;
        }
        const user = yield user_modals_1.default.findById(decoded.userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in protected route", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.protectedRoute = protectedRoute;
