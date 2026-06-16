import { ChallengeFrequency } from '@generated/prisma/enums';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

type DateRange = {
	startDate: string;
	endDate: string;
};

export const getDateRanges = (
	startDateStr: string,
	endDateStr: string,
	frequency: ChallengeFrequency,
): DateRange[] => {
	const startDate = dayjs(startDateStr);
	const endDate = dayjs(endDateStr);
	const ranges: DateRange[] = [];

	if (frequency === 'ONCE') {
		return [
			{
				startDate: startDate.format(DATE_FORMAT),
				endDate: endDate.format(DATE_FORMAT),
			},
		];
	}

	let currentStart = startDate;

	while (currentStart.isSameOrBefore(endDate, 'day')) {
		let currentEnd: dayjs.Dayjs;

		switch (frequency) {
			case 'DAILY':
				currentEnd = currentStart;
				break;
			case 'WEEKLY':
				currentEnd = currentStart.add(6, 'day');
				break;
			case 'MONTHLY':
				currentEnd = currentStart.add(1, 'month').subtract(1, 'day');
				break;
			default:
				throw new Error('Invalid mode. Use: daily, weekly, monthly, once.');
		}

		if (currentEnd.isAfter(endDate)) {
			currentEnd = endDate;
		}

		ranges.push({
			startDate: currentStart.format(DATE_FORMAT),
			endDate: currentEnd.format(DATE_FORMAT),
		});

		currentStart = currentEnd.add(1, 'day');
	}

	return ranges;
};
