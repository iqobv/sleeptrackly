import { IDashboardDay } from '@/types';
import { formatTime } from '@/utils';
import dayjs from 'dayjs';

interface StatsByDaysInfoItem {
	label: string;
	value: string;
}

const formatDate = 'DD.MM.YYYY HH:mm:ss';

export const STATS_BY_DAYS_INFO_ITEMS = (
	day: IDashboardDay
): StatsByDaysInfoItem[] => [
	{
		label: 'Sleep duration',
		value: day.data
			? formatTime(day.data?.sleepDuration).join(':')
			: '00:00:00',
	},
	{
		label: 'Sleep start',
		value: dayjs(day.data?.sleepStart).format(formatDate),
	},
	{
		label: 'Sleep end',
		value: dayjs(day.data?.sleepEnd).format(formatDate),
	},
];
