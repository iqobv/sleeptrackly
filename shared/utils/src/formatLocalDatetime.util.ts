import dayjs from 'dayjs';

export const formatLocalDatetime = (dateInput: string | Date): string => {
	if (!dateInput) return '';

	const date = dayjs(dateInput);

	if (!date.isValid()) return '';

	return date.format('YYYY-MM-DDTHH:mm:ss');
};
