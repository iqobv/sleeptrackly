import dayjs, { Dayjs } from 'dayjs';

export const formatDateTime = (date: Date | Dayjs) =>
	dayjs(date).format('DD.MM.YYYY HH:mm');
