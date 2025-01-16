"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const message_controllers_1 = require("../controllers/message.controllers");
const router = express_1.default.Router();
router.get("/users", auth_middleware_1.protectedRoute, message_controllers_1.getUsersForSidebar);
router.get("/:id", auth_middleware_1.protectedRoute, message_controllers_1.getMessages);
router.post("/send/:id", auth_middleware_1.protectedRoute, message_controllers_1.sendMessages);
exports.default = router;
