import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatToUtcDatetimeLocal = (
	dateInput?: string | Date | null,
): string => {
	if (!dateInput) return '';

	const date = dayjs.utc(dateInput);

	if (!date.isValid()) return '';

	return date.format('YYYY-MM-DDTHH:mm');
};
