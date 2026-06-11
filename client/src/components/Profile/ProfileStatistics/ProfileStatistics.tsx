'use client';

import type { ProfileStatistics as ProfileStatisticsType } from '@/types/profile/profile.types';
import { List } from '@shared/ui';
import { ProfileStatisticsCard } from './ProfileStatisticsCard/ProfileStatisticsCard';
import { PROFILE_STATISTICS_LIST } from './profileStatisticsList';

interface ProfileStatisticsProps {
	statistics: ProfileStatisticsType;
}

export const ProfileStatistics = ({ statistics }: ProfileStatisticsProps) => {
	return (
		<List
			items={PROFILE_STATISTICS_LIST}
			isHorizontal
			gap={20}
			style={{
				flexWrap: 'wrap',
			}}
			renderItem={(el) => (
				<ProfileStatisticsCard
					key={el.name}
					item={el}
					statistics={statistics}
				/>
			)}
		/>
	);
};
