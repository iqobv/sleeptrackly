import { Router } from "express";
import userSleepStatusController from "../controllers/userSleepStatus.controller.js";

const router = Router();

const { getSleepStatus, updateSleepStatus } = userSleepStatusController;

router.get("/user/:userId", getSleepStatus);
router.patch("/user/:userId", updateSleepStatus);

export default router;
