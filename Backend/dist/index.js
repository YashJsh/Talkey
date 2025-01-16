"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const messages_route_1 = __importDefault(require("./routes/messages.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./lib/socket");
const path_1 = __importDefault(require("path"));
require("dotenv").config();
socket_1.app.use(body_parser_1.default.json({ limit: "50mb" }));
socket_1.app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use(express_1.default.json());
socket_1.app.use(express_1.default.urlencoded({ extended: true }));
socket_1.app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
socket_1.app.use("/api/auth", auth_route_1.default);
socket_1.app.use("/api/messages", messages_route_1.default);
if (process.env.NODE_ENV !== "production") {
    socket_1.app.use(express_1.default.static(path_1.default.join(__dirname, "../Frontend/dist")));
    socket_1.app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}
socket_1.server.listen(5001, () => {
    console.log("Server is running on port 5001");
});
