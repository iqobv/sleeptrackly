import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatUtcOffsetToLocalTime = (offsetMinutes: number): string => {
	return dayjs
		.utc()
		.startOf('day')
		.add(offsetMinutes, 'minute')
		.local()
		.format('HH:mm');
};
