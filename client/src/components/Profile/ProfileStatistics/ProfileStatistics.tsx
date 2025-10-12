'use client';

import { List } from '@/components/UI';
import { IProfile } from '@/types';
import ProfileStatisticsCard from './ProfileStatisticsCard/ProfileStatisticsCard';
import { PROFILE_STATISTICS_LIST } from './profileStatisticsList';

interface ProfileStatisticsProps {
	profile: IProfile;
}

const ProfileStatistics = ({ profile }: ProfileStatisticsProps) => {
	return (
		<List
			items={PROFILE_STATISTICS_LIST}
			isHorizontal
			gap={20}
			style={{
				flexWrap: 'wrap',
			}}
			renderItem={(el) => (
				<ProfileStatisticsCard key={el.name} item={el} profile={profile} />
			)}
		/>
	);
};

export default ProfileStatistics;
