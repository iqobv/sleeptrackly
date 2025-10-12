'use client';

import { IDashboardDay } from '@/types';
import { STATS_BY_DAYS_INFO_ITEMS } from './statsByDaysInfoItems';
import styles from './StatsByDaysInfo.module.scss';

interface StatsByDaysInfoProps {
	day: IDashboardDay;
}

const StatsByDaysInfo = ({ day }: StatsByDaysInfoProps) => {
	return (
		<div className={styles['stats-by-days__item-info']}>
			{STATS_BY_DAYS_INFO_ITEMS(day).map((item) => (
				<div
					key={item.label}
					className={styles['stats-by-days__item-info-item']}
				>
					<p className={styles['stats-by-days__item-info-item-label']}>
						{item.label}
					</p>
					<p className={styles['stats-by-days__item-info-item-data']}>
						{item.value}
					</p>
				</div>
			))}
		</div>
	);
};

export default StatsByDaysInfo;
