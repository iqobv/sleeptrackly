import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';

dayjs.extend(isoWeek);
dayjs.extend(utc);

interface GeneratedRange {
	availableFrom: Date;
	availableTo: Date;
}

export const generateRange = (currentWeek: boolean = false): GeneratedRange => {
	const now = dayjs().utc();

	const nextMonday3Am = now.add(1, 'week').startOf('isoWeek').hour(3);

	if (currentWeek) {
		return {
			availableFrom: now.add(10, 'minute').toDate(),
			availableTo: nextMonday3Am.toDate(),
		};
	}

	return {
		availableFrom: nextMonday3Am.toDate(),
		availableTo: nextMonday3Am.add(1, 'week').toDate(),
	};
};
