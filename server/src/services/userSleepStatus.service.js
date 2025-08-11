import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

import UserSleepStatus from '../models/userSleepStatus.model.js';
import SleepEntry from '../models/sleepEntry.model.js';

const getSleepStatus = async (userId) => {
	const userSleepStatus = await UserSleepStatus.findOne({ userId });

	return userSleepStatus;
};

const updateSleepStatus = async (userId, clickedBy) => {
	const userSleepStatus = await UserSleepStatus.findOne({ userId });

	if (!userSleepStatus) return { error: true, message: 'User not found' };

	let isSleeping = userSleepStatus?.isSleeping;
	let sleepStart = userSleepStatus?.sleepStart;

	let sleepEntry = {};

	if (isSleeping) {
		const sleepEndDate = dayjs(clickedBy).toDate();

		const sleepDuration = dayjs(sleepEndDate).diff(sleepStart.date, 'second');
		const dateForChart = dayjs(sleepEndDate).startOf('day');

		const createdSleepEntry = await SleepEntry.create({
			userId,
			sleepStart: {
				localeDate: dayjs(sleepStart.date).format(),
				date: sleepStart.date,
			},
			sleepEnd: {
				localeDate: dayjs(clickedBy).format(),
				date: sleepEndDate,
			},
			sleepDuration,
			dateForChart: dateForChart.format('YYYY-MM-DD'),
		});

		createdSleepEntry.toObject();
		sleepEntry = createdSleepEntry;

		isSleeping = false;
		sleepStart = null;
	} else {
		sleepStart = {
			localeDate: dayjs(clickedBy).format(),
			date: dayjs(clickedBy).toDate(),
		};
		isSleeping = true;
	}

	await userSleepStatus.updateOne({ isSleeping, sleepStart });

	const result = {
		userSleepStatus,
		sleepEntry,
	};

	return result;
};

export default { getSleepStatus, updateSleepStatus };
