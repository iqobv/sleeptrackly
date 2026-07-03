import { Challenge } from '@/types/challenge/challenge.types';
import { capitalize } from '@shared/utils';
import { formatDate } from '@shared/utils/formatDateTime.util';

export interface ChallengeInfoField {
	name: string;
	value: string;
}

export const CHALLENGE_INFO_FIELDS = (
	data: Challenge,
): ChallengeInfoField[] => [
	{
		name: 'Start date',
		value: formatDate(new Date(data.startDate)),
	},
	{
		name: 'End date',
		value: formatDate(new Date(data.endDate)),
	},
	{
		name: 'Frequency',
		value: (() => {
			const freq = data?.frequency ?? '';
			if (!freq) return '';
			return capitalize(freq);
		})(),
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
