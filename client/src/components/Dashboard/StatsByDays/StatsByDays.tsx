'use client';

import { List } from '@/components/UI';
import { IDashboardDay } from '@/types';
import dayjs from 'dayjs';
import styles from './StatsByDays.module.scss';
import StatsByDaysInfo from './StatsByDaysInfo/StatsByDaysInfo';

interface StatsByDaysProps {
	days: IDashboardDay[];
}

const StatsByDays = ({ days }: StatsByDaysProps) => {
	return (
		<div className={`${styles['stats-by-days']}`}>
			<List
				items={days}
				gap={20}
				isHorizontal
				className={styles['stats-by-days__list']}
				renderItem={(el) => (
					<div key={el.day} className={styles['stats-by-days__item']}>
						<div className={styles['stats-by-days__item-date']}>
							<p className={styles['stats-by-days__item-date-day']}>
								{dayjs(el.day).format('dddd')}{' '}
							</p>
							<p>{dayjs(el.day).format('DD.MM.YYYY')}</p>
						</div>
						{!el?.data ? <p>No info</p> : <StatsByDaysInfo day={el} />}
					</div>
				)}
			/>
		</div>
	);
};

export default StatsByDays;
