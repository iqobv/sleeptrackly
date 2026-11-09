import { appDayjs } from '.';

export interface CalculatedSleepDuration {
	sleepDuration: number;
	dateForChart: string;
}

export const calculateSleepDuration = (
	start: Date,
	end: Date,
	dateFormat: string = 'YYYY-MM-DD',
): CalculatedSleepDuration => {
	const sleepEndDate = appDayjs(end).toDate();
	const sleepDuration = appDayjs(sleepEndDate).diff(start, 'second');
	const dateForChart = appDayjs(sleepEndDate).startOf('day').format(dateFormat);

	return { sleepDuration, dateForChart };
};
