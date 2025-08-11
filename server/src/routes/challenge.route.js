import { Router } from 'express';

import challengeController from '../controllers/challenge.controller.js';
import { checkAuth } from '../middlewares/checkAuth.middleware.js';
import { checkIsAdmin } from '../middlewares/checkIsAdmin.middleware.js';

const {
	createChallenge,
	getChallenges,
	getChallengeById,
	updateChallenge,
	updateTask,
	deleteChallenge,
} = challengeController;

const router = Router();

router.get('/me', checkAuth, checkIsAdmin, getChallenges);
router.get('/id/:id', checkAuth, checkIsAdmin, getChallengeById);

router.post('/', checkAuth, checkIsAdmin, createChallenge);

router.patch('/:id', checkAuth, checkIsAdmin, updateChallenge);
router.put('/:id', checkAuth, checkIsAdmin, updateChallenge);
router.patch('/:challengeId/task/:taskId', checkAuth, checkIsAdmin, updateTask);
router.put('/:challengeId/task/:taskId', checkAuth, checkIsAdmin, updateTask);

router.delete('/:id', checkAuth, checkIsAdmin, deleteChallenge);

export default router;
