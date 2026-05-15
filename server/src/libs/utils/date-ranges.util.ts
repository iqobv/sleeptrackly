import { ChallengeFrequency } from '@generated/prisma/enums';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

export const getDateRanges = (
	startDateStr: string,
	endDateStr: string,
	frequency: ChallengeFrequency,
) => {
	const startDate = dayjs(startDateStr);
	const endDate = dayjs(endDateStr);
	const ranges: { startDate: string; endDate: string }[] = [];

	if (frequency === 'ONCE') {
		return [
			{
				startDate: startDate.format('YYYY-MM-DD'),
				endDate: endDate.format('YYYY-MM-DD'),
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
			startDate: currentStart.format('YYYY-MM-DD'),
			endDate: currentEnd.format('YYYY-MM-DD'),
		});

		currentStart = currentEnd.add(1, 'day');
	}

	return ranges;
};
