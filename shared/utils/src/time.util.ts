import { appDayjs } from '.';

export const formatUtcOffsetToLocalTime = (offsetMinutes: number): string => {
	return appDayjs
		.utc()
		.startOf('day')
		.add(offsetMinutes, 'minute')
		.local()
		.format('HH:mm');
};
