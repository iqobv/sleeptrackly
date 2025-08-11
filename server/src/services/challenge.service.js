import dayjs from 'dayjs';
import mongoose from 'mongoose';
import createError from 'http-errors';

import Challenge from '../models/challenge.model.js';
import { getDateRanges } from '../utils/getDatesInRange.util.js';

const createChallenge = async (userId, data) => {
	const {
		tasksOptions: { increment, value, description },
		frequency = 'daily',
		startDate,
		endDate,
	} = data;

	const nowDate = dayjs().toDate();

	if (dayjs(startDate).isBefore(nowDate))
		throw createError(400, 'Start date cannot be in the past');

	if (dayjs(endDate).isBefore(nowDate))
		throw createError(400, 'End date cannot be in the past');

	if (dayjs(endDate).isBefore(dayjs(startDate)))
		throw createError(400, 'End date cannot be before start date');

	const tasks = [];

	const datesObj = {
		startDate: {
			localeDate: dayjs(startDate).format(),
			date: dayjs(startDate).toDate(),
		},
		endDate: {
			localeDate: dayjs(endDate).format(),
			date: dayjs(endDate).toDate(),
		},
	};

	const dates = getDateRanges(startDate, endDate, frequency);

	let currentValue = value || 0;

	const boolStates = {};

	if (
		nowDate.getTime() > dayjs(startDate).toDate().getTime() &&
		nowDate.getTime() < dayjs(endDate).toDate().getTime()
	) {
		boolStates.isStarted = true;
	}

	if (nowDate.getTime() > dayjs(endDate).toDate().getTime()) {
		boolStates.isStarted = false;
		boolStates.isCompleted = true;
	}

	dates.forEach((date) => {
		tasks.push({
			...date,
			description,
			targetValue: increment !== null ? currentValue : value,
		});
		currentValue += increment;
	});

	const challenge = await Challenge.create({
		userId,
		tasks,
		...boolStates,
		...data,
		...datesObj,
	});

	return challenge;
};

const getChallenges = async (userId) => {
	const challenges = await Challenge.find({ userId }).select('-tasks');

	return challenges;
};

const getChallengeById = async (challengeId) => {
	if (!mongoose.Types.ObjectId.isValid(challengeId)) return null;

	const challenge = await Challenge.findById(challengeId);

	return challenge;
};

const updateChallengeStatuses = async () => {
	const nowDate = dayjs().toDate();

	const challenges = await Challenge.find({
		isStarted: false,
		isCompleted: false,
	});

	for (const challenge of challenges) {
		const startDate = dayjs(challenge.startDate.date).toDate();
		const endDate = dayjs(challenge.endDate.date).toDate();

		if (
			(!challenge.isStarted &&
				!challenge.isCompleted &&
				nowDate.getTime() === startDate.getTime()) ||
			(nowDate.getTime() > startDate.getTime() &&
				nowDate.getTime() < endDate.getTime())
		) {
			challenge.isStarted = true;
		}

		const completedTasks = challenge.tasks.filter((task) => task.isCompleted);

		if (completedTasks.length === challenge.tasks.length) {
			challenge.isStarted = false;
			challenge.isCompleted = true;
		}

		if (challenge.isModified()) {
			await challenge.save();
		}
	}
};

const updateChallenge = async (challengeId, data) => {
	const { startDate, endTime } = data;

	const datesObj = {
		startDate: {
			localeDate: dayjs(startDate).format(),
			date: dayjs(startDate).toDate(),
		},
		endTime: {
			localeDate: dayjs(endTime).format(),
			date: dayjs(endTime).toDate(),
		},
	};

	const challenge = await Challenge.findByIdAndUpdate(
		challengeId,
		{
			...data,
			...datesObj,
		},
		{
			new: true,
		},
	);

	return challenge;
};

const updateTask = async (challengeId, taskId, data) => {
	const nowDate = dayjs().toDate();

	const { isCompleted, completedValue } = data;

	const challenge = await Challenge.findById(challengeId);

	const task = challenge.tasks.id(taskId);
	const startDate = dayjs(task.startDate).toDate();

	if (nowDate.getTime() > startDate.getTime()) {
		task.isCompleted = isCompleted;
		task.completedValue = completedValue || task.targetValue;
	} else {
		throw createError(400, 'Cannot update task before start date');
	}

	const completedTasks = challenge.tasks.filter((task) => task.isCompleted);

	if (completedTasks.length === challenge.tasks.length) {
		challenge.isStarted = false;
		challenge.isCompleted = true;
	}

	await challenge.save();

	return task;
};

const deleteChallenge = async (challengeId, userId) => {
	const challenge = await Challenge.findByIdAndDelete(challengeId, {
		userId,
	});

	return challenge;
};

export default {
	createChallenge,
	getChallenges,
	getChallengeById,
	updateChallenge,
	updateChallengeStatuses,
	updateTask,
	deleteChallenge,
};
