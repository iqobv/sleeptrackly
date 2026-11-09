import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { appDayjs } from './dayjs.util';

export interface CalculatedSleepDuration {
	sleepDuration: number;
	dateForChart: string;
}

export const calculateSleepDuration = (
	start: Date,
	end: Date,
): CalculatedSleepDuration => {
	const sleepEndDate = appDayjs(end).toDate();
	const sleepDuration = appDayjs(sleepEndDate).diff(start, 'second');
	const dateForChart = appDayjs(sleepEndDate)
		.startOf('day')
		.format(DATE_FORMAT);

	return { sleepDuration, dateForChart };
};
