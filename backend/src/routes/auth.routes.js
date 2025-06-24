import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const authRoutes = express();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

export default authRoutes;
