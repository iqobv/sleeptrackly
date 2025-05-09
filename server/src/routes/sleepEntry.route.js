import { Router } from "express";
import sleepEntryController from "../controllers/sleepEntry.controller.js";

const router = Router();

const { getSleepsEntryForWeek } = sleepEntryController;

router.get("/user/:userId", getSleepsEntryForWeek);

export default router;
