'use client';

import { IProfile } from '@/types';
import styles from './ProfileStatistics.module.scss';
import ProfileStatisticsCard from './ProfileStatisticsCard/ProfileStatisticsCard';
import { PROFILE_STATISTICS_LIST } from './profileStatisticsList';

interface ProfileStatisticsProps {
	profile: IProfile;
}

const ProfileStatistics = ({ profile }: ProfileStatisticsProps) => {
	return (
		<div className={styles['profile-statistics']}>
			<ul className={styles['profile-statistics__list']}>
				{PROFILE_STATISTICS_LIST.map((el) => (
					<ProfileStatisticsCard key={el.name} item={el} profile={profile} />
				))}
			</ul>
		</div>
	);
};

export default ProfileStatistics;
