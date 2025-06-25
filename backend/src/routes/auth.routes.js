import express from "express";
import { getMe, login, logout, signUp } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = express();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/me", authMiddleware, getMe)

export default authRoutes;
