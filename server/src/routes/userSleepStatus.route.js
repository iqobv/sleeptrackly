import { Router } from 'express';
import userSleepStatusController from '../controllers/userSleepStatus.controller.js';
import { checkAuth } from '../middlewares/checkAuth.middleware.js';

const router = Router();

const { getSleepStatus, updateSleepStatus } = userSleepStatusController;

router.get('/me', checkAuth, getSleepStatus);
router.patch('/me', checkAuth, updateSleepStatus);

export default router;
