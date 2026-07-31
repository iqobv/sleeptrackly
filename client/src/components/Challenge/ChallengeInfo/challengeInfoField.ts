import { ChallengeFull } from '@/types/challenge/challenge.types';
import { formatDate } from '@shared/utils/formatDateTime.util';

export interface ChallengeInfoField {
	name: string;
	value: string;
}

export const CHALLENGE_INFO_FIELDS = (
	data: ChallengeFull,
): ChallengeInfoField[] => [
	{
		name: 'Start date',
		value: formatDate(data.availableFrom ? new Date(data.availableFrom) : ''),
	},
	{
		name: 'End date',
		value: formatDate(data.availableTo ? new Date(data.availableTo) : ''),
	},
];
