import express from "express";
import { followUnfollowUser, getUserProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectedRoute.js";


const router = express.Router();

router.get('/profile/:username' , getUserProfile )
router.get ('/suggested', protectRoute, getUserProfile)
router.post('/follow/:id', protectRoute, followUnfollowUser)

export default router;