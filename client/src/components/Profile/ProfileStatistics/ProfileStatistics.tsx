'use client';

import { List } from '@/components/UI';
import type { ProfileStatistics as ProfileStatisticsType } from '@/types';
import ProfileStatisticsCard from './ProfileStatisticsCard/ProfileStatisticsCard';
import { PROFILE_STATISTICS_LIST } from './profileStatisticsList';

interface ProfileStatisticsProps {
	statistics: ProfileStatisticsType;
}

const ProfileStatistics = ({ statistics }: ProfileStatisticsProps) => {
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

export default ProfileStatistics;
