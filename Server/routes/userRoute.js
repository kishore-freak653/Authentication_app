import express from 'express';
import { authUser ,registerUser,logoutUser,getUserprofile,updateUserprofile} from '../Controllers/User_controller.js';
import {protect} from "../Middleware/authMiddleware.js"
const router = express.Router();

router.post('/',registerUser)
router.post('/auth',authUser)
router.post("/logout",logoutUser);
router.get("/profile",protect, getUserprofile);
router.put("/profile",protect ,updateUserprofile);

export default router;