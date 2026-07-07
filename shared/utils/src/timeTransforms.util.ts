import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const transformSecondsToHours = (seconds: number): string => {
	if (!Number.isFinite(seconds)) {
		return '0h 0m';
	}

	const dur = dayjs.duration(seconds, 'seconds');
	const totalHours = Math.floor(dur.asHours());
	const minutes = dur.minutes();

	return `${totalHours}h ${minutes}m`;
};
