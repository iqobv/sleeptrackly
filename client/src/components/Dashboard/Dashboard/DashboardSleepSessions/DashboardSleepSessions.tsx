'use client';

import { DashboardDay } from '@/types/dashboard/dashboard.types';
import { SectionHeader } from '@shared/ui';
import { DashboardSleepSessionCard } from './DashboardSleepSessionCard/DashboardSleepSessionCard';
import styles from './DashboardSleepSessions.module.scss';

interface DashboardSleepSessionsProps {
	days: DashboardDay[];
}

export const DashboardSleepSessions = ({
	days,
}: DashboardSleepSessionsProps) => {
	const hasData = days.some((day) => day.data);

	return (
		<>
			<SectionHeader title="Sleep Sessions" titleProps={{ variant: 'h2' }} />
			<div className={styles.list}>
				{!hasData && <p>No sleep sessions for the selected period.</p>}
				{days.map((day) => {
					if (!day.data) return null;

					const moreTnanOneEntry = day.data.length > 1;

					return (
						<DashboardSleepSessionCard
							data={day}
							key={day.day}
							moreThanOneEntry={moreTnanOneEntry}
						/>
					);
				})}
			</div>
		</>
	);
};
