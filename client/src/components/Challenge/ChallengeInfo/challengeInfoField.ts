import { Challenge } from '@/types';
import { formatDateTime } from '@/utils';

export interface ChallengeInfoField {
	name: string;
	value: string;
}

export const CHALLENGE_INFO_FIELDS = (
	data: Challenge,
): ChallengeInfoField[] => [
	{
		name: 'Start date',
		value: formatDateTime(new Date(data.startDate)),
	},
	{
		name: 'End date',
		value: formatDateTime(new Date(data.endDate)),
	},
	{
		name: 'Frequency',
		value:
			(data?.frequency).charAt(0).toUpperCase() +
			data?.frequency.toLowerCase().slice(1),
	},
	{
		name: 'Started',
		value: data?.isStarted ? 'Yes' : 'No',
	},
	{
		name: 'Completed',
		value: data?.isCompleted ? 'Yes' : 'No',
	},
];
