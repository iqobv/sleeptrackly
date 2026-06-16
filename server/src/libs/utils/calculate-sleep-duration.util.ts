import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import dayjs from 'dayjs';

export interface CalculatedSleepDuration {
	sleepDuration: number;
	dateForChart: string;
}

export const calculateSleepDuration = (
	start: Date,
	end: Date,
): CalculatedSleepDuration => {
	const sleepEndDate = dayjs(end).toDate();
	const sleepDuration = dayjs(sleepEndDate).diff(start, 'second');
	const dateForChart = dayjs(sleepEndDate).startOf('day').format(DATE_FORMAT);

	return { sleepDuration, dateForChart };
};
