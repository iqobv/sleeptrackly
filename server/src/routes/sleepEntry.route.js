import { Router } from 'express';
import sleepEntryController from '../controllers/sleepEntry.controller.js';
import { checkAuth } from '../middlewares/checkAuth.middleware.js';

const router = Router();

const { getSleepsEntryForWeek } = sleepEntryController;

router.get('/me', checkAuth, getSleepsEntryForWeek);

export default router;
