import express from "express";

import {getMe, signup, login, logout } from "../controllers/auth.controler.js";


const router = express.Router();

router.get('/me',getMe)

router.post("/signup", signup),

router.post("/login", login);

router.post("/logout", logout);

router.get("/test", (req, res) => {
  res.send("Auth route works");
});


export default router;
