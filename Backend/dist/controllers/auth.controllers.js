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
exports.checkAuth = exports.updateProfile = exports.signOut = exports.signIn = exports.signUp = void 0;
const user_modals_1 = __importDefault(require("../models/user.modals"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../lib/db");
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const tokenGenerate_1 = require("../lib/tokenGenerate");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    const { fullName, email, password } = req.body;
    try {
        if (password.length < 6) {
            res
                .status(400)
                .json({ message: "Password must be at least 6 characters long" });
            return;
        }
        const user = yield user_modals_1.default.findOne({ email });
        if (user) {
            res.status(400).json({ success: false, message: "Email already exists" });
            return;
        }
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield user_modals_1.default.create({
            fullName,
            email,
            password: hashPassword,
        });
        if (!newUser) {
            res.status(400).json({ sucess: false, message: "Unable to create User" });
            return;
        }
        const userId = newUser._id;
        (0, tokenGenerate_1.generateToken)(userId.toString(), res);
        yield newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
        return;
    }
    catch (error) {
        console.log("Error in sign up of user : ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and Password are required" });
        return;
    }
    try {
        const user = yield user_modals_1.default.findOne({
            email: email,
        });
        if (!user) {
            res.status(400).json({ message: "Invalid Credentials" });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid Credentials" });
            return;
        }
        const userId = user._id;
        (0, tokenGenerate_1.generateToken)(userId.toString(), res);
        res.status(201).json({
            success: true,
            message: "User logged in successfully",
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.signIn = signIn;
const signOut = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.signOut = signOut;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    try {
        const { profilePic } = req.body;
        const userId = req.user.id;
        if (!profilePic) {
            res.status(400).json({ message: "Profile not found" });
            return;
        }
        const uploadResponse = yield cloudinary_1.default.uploader.upload(profilePic);
        const updateUser = yield user_modals_1.default.findByIdAndUpdate(userId, {
            profilepic: uploadResponse.secure_url,
        }, { new: true });
        res
            .status(200)
            .json({ message: "UserUpdatedSuccessfully", data: updateUser });
    }
    catch (error) {
        console.log("Error in updating profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateProfile = updateProfile;
const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    }
    catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.checkAuth = checkAuth;
