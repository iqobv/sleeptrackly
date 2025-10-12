'use client';

import { SectionHeader } from '@/components/UI';
import { IProfile } from '@/types';
import { ProfileStatisticsList } from '../profileStatisticsList';
import styles from './ProfileStatisticsCard.module.scss';

interface ProfileStatisticsCardProps {
	item: ProfileStatisticsList;
	profile: IProfile;
}

const ProfileStatisticsCard = ({
	item,
	profile,
}: ProfileStatisticsCardProps) => {
	return (
		<div className={styles['profile-statistics__card']}>
			<SectionHeader
				title={(profile[item.field] as number).toString()}
				titleComponent="p"
				titleClassName={styles['profile-statistics__card-title']}
				description={item.label}
			/>
		</div>
	);
};

export default ProfileStatisticsCard;
