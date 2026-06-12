'use client';

import { ProfileStatistics } from '@/types/profile/profile.types';
import { SectionHeader } from '@shared/ui';
import { ProfileStatisticsList } from '../profileStatisticsList';
import styles from './ProfileStatisticsCard.module.scss';

interface ProfileStatisticsCardProps {
	item: ProfileStatisticsList;
	statistics: ProfileStatistics;
}

export const ProfileStatisticsCard = ({
	item,
	statistics,
}: ProfileStatisticsCardProps) => {
	return (
		<div className={styles.card}>
			<SectionHeader
				title={(statistics[item.field] as number).toString()}
				titleProps={{
					variant: 'h3',
					as: 'p',
					weight: 'bold',
				}}
				description={item.label}
				textAlign="center"
			/>
		</div>
	);
};
