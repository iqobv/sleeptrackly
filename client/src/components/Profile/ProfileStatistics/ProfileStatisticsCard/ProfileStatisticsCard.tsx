'use client';

import { SectionHeader } from '@/components/UI';
import { ProfileStatistics } from '@/types';
import { ProfileStatisticsList } from '../profileStatisticsList';
import styles from './ProfileStatisticsCard.module.scss';

interface ProfileStatisticsCardProps {
	item: ProfileStatisticsList;
	statistics: ProfileStatistics;
}

const ProfileStatisticsCard = ({
	item,
	statistics,
}: ProfileStatisticsCardProps) => {
	return (
		<div className={styles.card}>
			<SectionHeader
				title={(statistics[item.field] as number).toString()}
				titleComponent="p"
				titleClassName={styles.title}
				description={item.label}
			/>
		</div>
	);
};

export default ProfileStatisticsCard;
