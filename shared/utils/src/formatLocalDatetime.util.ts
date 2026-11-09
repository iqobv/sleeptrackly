import { appDayjs } from '.';

export const formatLocalDatetime = (dateInput: string | Date): string => {
	if (!dateInput) return '';

	const date = appDayjs(dateInput);

	if (!date.isValid()) return '';

	return date.format('YYYY-MM-DDTHH:mm:ss');
};
