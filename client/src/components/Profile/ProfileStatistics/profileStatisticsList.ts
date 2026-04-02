import { IProfileStatistics } from '@/types';

export interface ProfileStatisticsList {
	name: string;
	label: string;
	field: keyof IProfileStatistics;
}

export const PROFILE_STATISTICS_LIST: ProfileStatisticsList[] = [
	{
		label: 'Nights Tracked',
		name: 'nightsTracked',
		field: 'countOfSleepEntries',
	},
	{
		name: 'countOfCompletedChallenges',
		label: 'Completed Challenges',
		field: 'countOfCompletedChallenges',
	},
];
