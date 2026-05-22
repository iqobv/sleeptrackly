'use client';

import { SectionHeader } from '@/components/UI';
import { useFormatLocaleTime, useTransformSecondsToHours } from '@/hooks';
import { DashboardDay } from '@/types';
import DashboardCard from '../../DashboardCard/DashboardCard';
import styles from './DashboardSleepSessions.module.scss';

interface DashboardSleepSessionsProps {
	days: DashboardDay[];
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
		<div>
			<SectionHeader title="Sleep Sessions" titleComponent="h2" />
			<div className={styles.list}>
				{!hasData && <p>No sleep sessions for the selected period.</p>}
				{days.map((day) => {
					if (!day.data) return null;

					const startTime = formatTime(day.data.sleepStart);
					const endTime = formatTime(day.data.sleepEnd);

					const rangeLabel = `${startTime} - ${endTime}`;

					return (
						<DashboardCard key={day.day} className={styles.sleepSession}>
							<div className={styles.info}>
								<p className={styles.date}>
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
