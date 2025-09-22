import { IProfile } from '@/types';

export interface ProfileStatisticsList {
	name: string;
	label: string;
	field: keyof IProfile;
}

export const PROFILE_STATISTICS_LIST: ProfileStatisticsList[] = [
	{
		name: 'completedChallenges',
		label: 'Completed Challenges',
		field: 'completedChallenges',
	},
	{ label: 'Nights Tracked', name: 'nightsTracked', field: 'sleepEntries' },
];
