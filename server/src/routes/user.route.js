import { Router } from "express";

import userController from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/checkAuth.middleware.js";

const router = Router();

router.post("/", checkAuth, userController.createUser);

router.get("/:userId", checkAuth, userController.getUserById);

export default router;
