"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post('/signup', auth_controllers_1.signUp);
router.post('/signin', auth_controllers_1.signIn);
router.post('/signout', auth_controllers_1.signOut);
router.put('/update-profile', auth_middleware_1.protectedRoute, auth_controllers_1.updateProfile);
router.get('/check', auth_middleware_1.protectedRoute, auth_controllers_1.checkAuth);
exports.default = router;
