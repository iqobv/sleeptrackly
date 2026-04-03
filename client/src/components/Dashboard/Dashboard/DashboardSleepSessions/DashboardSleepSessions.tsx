'use client';

import { SectionHeader } from '@/components/UI';
import { useFormatLocaleTime, useTransformSecondsToHours } from '@/hooks';
import { IDashboardDay } from '@/types';
import DashboardCard from '../../DashboardCard/DashboardCard';
import styles from './DashboardSleepSessions.module.scss';

interface DashboardSleepSessionsProps {
	days: IDashboardDay[];
}

const DashboardSleepSessions = ({ days }: DashboardSleepSessionsProps) => {
	const transform = useTransformSecondsToHours();
	const formatTime = useFormatLocaleTime();

	const dateFormatter = new Intl.DateTimeFormat(undefined, {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
	});

	const hasData = days.some((day) => day.data);

	return (
		<div className={styles['sleep-sessions']}>
			<SectionHeader title="Sleep Sessions" titleComponent="h2" />
			<div className={styles['sleep-sessions__list']}>
				{!hasData && <p>No sleep sessions for the selected period.</p>}
				{days.map((day) => {
					if (!day.data) return null;

					const startTime = formatTime(day.data.sleepStart);
					const endTime = formatTime(day.data.sleepEnd);

					const rangeLabel = `${startTime} - ${endTime}`;

					return (
						<DashboardCard key={day.day} className={styles['sleep-session']}>
							<div className={styles['sleep-session__info']}>
								<p className={styles['sleep-session__date']}>
									{dateFormatter.format(new Date(day.day))}
								</p>
								<div>{rangeLabel}</div>
							</div>
							<p>{transform(day.data.sleepDuration)}</p>
						</DashboardCard>
					);
				})}
			</div>
		</div>
	);
};

export default DashboardSleepSessions;
