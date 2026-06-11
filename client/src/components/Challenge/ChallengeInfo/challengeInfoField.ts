import { Challenge } from '@/types/challenge/challenge.types';
import { capitalize, formatDateTime } from '@shared/utils';

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
