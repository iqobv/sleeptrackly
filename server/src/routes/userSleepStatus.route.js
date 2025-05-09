import { Router } from "express";
import userSleepStatusController from "../controllers/userSleepStatus.controller.js";

const router = Router();

const { getSleepStatus, updateSleepStatus } = userSleepStatusController;

router.get("/me", getSleepStatus);
router.patch("/me", updateSleepStatus);

export default router;
