import { appDayjs } from '.';

export const formatToUtcDatetimeLocal = (
	dateInput?: string | Date | null,
): string => {
	if (!dateInput) return '';

	const date = appDayjs.utc(dateInput);

	if (!date.isValid()) return '';

	return date.format('YYYY-MM-DDTHH:mm');
};
