'use client';

import { IDashboardDay } from '@/types';
import { formatTime } from '@/utils';
import dayjs from 'dayjs';
import styles from './StatsByDays.module.scss';

interface StatsByDaysProps {
	days: IDashboardDay[];
}

const StatsByDays = ({ days }: StatsByDaysProps) => {
	return (
		<div className={`${styles['stats-by-days']} fade-in`}>
			<ul className={styles['stats-by-days__list']}>
				{days.map((el) => (
					<li key={el.day} className={styles['stats-by-days__item']}>
						<div className={styles['stats-by-days__item-date']}>
							<p className={styles['stats-by-days__item-date-day']}>
								{dayjs(el.day).format('dddd')}{' '}
							</p>
							<p>{dayjs(el.day).format('DD.MM.YYYY')}</p>
						</div>
						{!el?.data ? (
							<p>No info</p>
						) : (
							<div className={styles['stats-by-days__item-info']}>
								<div className={styles['stats-by-days__item-info-item']}>
									Sleep duration:
									<p className={styles['stats-by-days__item-info-item-data']}>
										{el.data
											? formatTime(el.data?.sleepDuration).join(':')
											: '00:00:00'}
									</p>
								</div>
								<div className={styles['stats-by-days__item-info-item']}>
									Sleep start:
									<p className={styles['stats-by-days__item-info-item-data']}>
										{dayjs(el.data?.sleepStart).format('DD.MM.YYYY HH:mm:ss')}
									</p>
								</div>
								<div className={styles['stats-by-days__item-info-item']}>
									Sleep end:
									<p className={styles['stats-by-days__item-info-item-data']}>
										{dayjs(el.data?.sleepEnd).format('DD.MM.YYYY HH:mm:ss')}
									</p>
								</div>
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default StatsByDays;
