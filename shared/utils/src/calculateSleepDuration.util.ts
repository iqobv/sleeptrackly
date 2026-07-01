import dayjs from 'dayjs';

export interface CalculatedSleepDuration {
	sleepDuration: number;
	dateForChart: string;
}

export const calculateSleepDuration = (
	start: Date,
	end: Date,
	dateFormat: string = 'YYYY-MM-DD',
): CalculatedSleepDuration => {
	const sleepEndDate = dayjs(end).toDate();
	const sleepDuration = dayjs(sleepEndDate).diff(start, 'second');
	const dateForChart = dayjs(sleepEndDate).startOf('day').format(dateFormat);

	return { sleepDuration, dateForChart };
};
