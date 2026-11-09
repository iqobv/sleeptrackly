import { appDayjs } from './dayjs.util';

export const getNextMondayUTC = (fromDate: Date): Date => {
	const now = appDayjs.utc(fromDate);

	const currentDay = now.day();
	const daysToAdd = (1 - currentDay + 7) % 7;

	let target = now
		.add(daysToAdd, 'day')
		.hour(3)
		.minute(0)
		.second(0)
		.millisecond(0);

	if (daysToAdd === 0 && !now.isBefore(target)) target = target.add(1, 'week');

	return target.toDate();
};
