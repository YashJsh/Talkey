import  express  from "express";
import { checkAuth, signIn, signOut, signUp, updateProfile } from "../controllers/auth.controllers";
import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post('/signup', signUp);

router.post('/signin', signIn);

router.post('/signout', signOut);

router.put('/update-profile', protectedRoute, updateProfile);

router.get('/check', protectedRoute, checkAuth)

export default router;