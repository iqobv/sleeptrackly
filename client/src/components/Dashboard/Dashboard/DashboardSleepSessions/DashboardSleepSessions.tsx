'use client';

import { DashboardDay } from '@/types/dashboard/dashboard.types';
import { useFormatLocaleTime, useTransformSecondsToHours } from '@shared/hooks';
import { SectionHeader } from '@shared/ui';
import { DashboardCard } from '../../DashboardCard/DashboardCard';
import styles from './DashboardSleepSessions.module.scss';

interface DashboardSleepSessionsProps {
	days: DashboardDay[];
}

export const DashboardSleepSessions = ({
	days,
}: DashboardSleepSessionsProps) => {
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
			<SectionHeader title="Sleep Sessions" titleProps={{ variant: 'h2' }} />
			<div className={styles.list}>
				{!hasData && <p>No sleep sessions for the selected period.</p>}
				{days.map((day) => {
					if (!day.data) return null;

					return day.data.map((entry) => {
						const startTime = formatTime(entry.sleepStart);
						const endTime = formatTime(entry.sleepEnd);

						const rangeLabel = `${startTime} - ${endTime}`;

						return (
							<DashboardCard key={entry.id} className={styles.sleepSession}>
								<div className={styles.info}>
									<p className={styles.date}>
										{dateFormatter.format(new Date(day.day))}
									</p>
									<div>{rangeLabel}</div>
								</div>
								<p>{transform(entry.sleepDuration)}</p>
							</DashboardCard>
						);
					});
				})}
			</div>
		</div>
	);
};
