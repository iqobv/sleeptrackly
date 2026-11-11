import { appDayjs } from '@shared/utils';

export const transformSecondsToHours = (seconds: number): string => {
	if (!Number.isFinite(seconds)) return '0h 0m';

	const dur = appDayjs.duration(seconds, 'seconds');
	const totalHours = Math.floor(dur.asHours());
	const minutes = dur.minutes();

	return `${totalHours}h ${minutes}m`;
};
