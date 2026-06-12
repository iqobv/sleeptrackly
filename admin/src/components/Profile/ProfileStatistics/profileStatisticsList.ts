import { ProfileStatistics } from '@/types/profile/profile.types';

export interface ProfileStatisticsList {
	name: string;
	label: string;
	field: keyof ProfileStatistics;
}

export const PROFILE_STATISTICS_LIST: ProfileStatisticsList[] = [
	{
		label: 'Nights Tracked',
		name: 'nightsTracked',
		field: 'countOfSleepEntries',
	},
	{
		name: 'completedChallenges',
		label: 'Completed Challenges',
		field: 'countOfCompletedChallenges',
	},
];
