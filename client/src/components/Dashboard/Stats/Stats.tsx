'use client';

import { IStatistics } from '@/types';
import { formatTime } from '@/utils';
import styles from './Stats.module.scss';

interface StatsProps {
	data: IStatistics;
}

const Stats = ({ data }: StatsProps) => {
	const {
		totalSleepDuration: total,
		averageSleepDurationForWeek: avgForWeek,
		averageSleepDurationByData: avgByData,
	} = data;

	return (
		<div className={styles['stats']}>
			<p>In this week you slept {formatTime(total).join(':')}</p>
			<p>Average sleep duration for week: {formatTime(avgForWeek).join(':')}</p>
			<p>Average sleep duration by data: {formatTime(avgByData).join(':')}</p>
		</div>
	);
};

export default Stats;
