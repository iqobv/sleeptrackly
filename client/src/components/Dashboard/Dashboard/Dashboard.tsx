'use client';

import { SectionHeader } from '@shared/ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { DashboardWeekStats } from '../DashboardWeekStats/DashboardWeekStats';
import { SleepChart } from '../SleepChart/SleepChart';
import { WeekPagination } from '../WeekPagination/WeekPagination';
import styles from './Dashboard.module.scss';
import { DashboardLoader } from './DashboardLoader';
import { DashboardSleepSessions } from './DashboardSleepSessions/DashboardSleepSessions';
import { useDashboard } from './useDashboard';

export const Dashboard = () => {
	const { data, isLoading, isPlaceholderData } = useDashboard();
	const [isVisuallyLoading, setIsVisuallyLoading] = useState(false);

	if (!isPlaceholderData && isVisuallyLoading) {
		setIsVisuallyLoading(false);
	}
	
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		if (isPlaceholderData) {
			timeoutId = setTimeout(() => {
				setIsVisuallyLoading(true);
			}, 200);
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [isPlaceholderData]);
	return (
		<div className={styles.dashboard}>
			<SectionHeader title="Weekly Rest" containerClassName={styles.header} />
			{isLoading ? (
				<DashboardLoader />
			) : (
				data && (
					<div
						className={clsx(
							styles.wrapper,
							isVisuallyLoading && styles.loading,
							'fade-in',
						)}
					>
						<WeekPagination hasMore={data.hasMore} days={data.days} />
						<div className={styles.content}>
							<DashboardWeekStats data={data} />
							<SleepChart data={data.days} />
						</div>
						<DashboardSleepSessions days={data.days} />
					</div>
				)
			)}
		</div>
	);
};
