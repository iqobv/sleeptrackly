import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(duration);

export interface CountdownResult {
	ms: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	formatted: string;
}

export const getCountdownToNextMonday = (): CountdownResult => {
	const now = dayjs.utc();

	let target = now.day(1).hour(3).minute(0).second(0).millisecond(0);

	if (!target.isAfter(now)) target = target.add(1, 'week');

	const diffMs = target.diff(now);
	const timeLeft = dayjs.duration(diffMs);

	const days = Math.floor(timeLeft.asDays());
	const hours = timeLeft.hours();
	const minutes = timeLeft.minutes();
	const seconds = timeLeft.seconds();

	const formatted = `${days}d ${hours}h ${minutes}m`;

	return {
		ms: diffMs,
		days,
		hours,
		minutes,
		seconds,
		formatted,
	};
};
