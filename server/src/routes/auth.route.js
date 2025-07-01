import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const router = Router();

const { login, logout, register, checkAuth } = authController;

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router.get("/check-auth", checkAuth);

export default router;
