'use client';

import { PageHeader } from '@/components/UI';
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
		<li className={styles['profile-statistics__card']}>
			<PageHeader
				title={(profile[item.field] as number).toString()}
				titleComponent="p"
				description={item.label}
			/>
		</li>
	);
};

export default ProfileStatisticsCard;
