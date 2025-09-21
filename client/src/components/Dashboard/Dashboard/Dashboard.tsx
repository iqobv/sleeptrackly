'use client';

import { getStatisticsByWeekForUser } from '@/api';
import { useAuth, useWeekPagination } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import DashboardLoader from '../DashboardLoader/DashboardLoader';
import SleepChart from '../SleepChart/SleepChart';
import Stats from '../Stats/Stats';
import StatsByDays from '../StatsByDays/StatsByDays';
import WeekPagination from '../WeekPagination/WeekPagination';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
	const { isAuthenticated } = useAuth();
	const { selectedWeek } = useWeekPagination();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['dashboard', selectedWeek],
		queryFn: () => getStatisticsByWeekForUser(selectedWeek),
		enabled: !!isAuthenticated,
	});

	const [showSkeleton, setShowSkeleton] = useState(true);

	useEffect(() => {
		if (!isLoading && !isFetching && data) {
			const timer = setTimeout(() => setShowSkeleton(false), 300);
			return () => clearTimeout(timer);
		} else {
			setShowSkeleton(true);
		}
	}, [isLoading, isFetching, data]);

	return (
		<div className={styles['dashboard']}>
			{showSkeleton ? (
				<DashboardLoader />
			) : (
				data && (
					<>
						<WeekPagination totalWeeks={data?.totalWeeks} days={data?.days} />
						<Stats data={data.statistics} />
						<SleepChart data={data.days} />
						<StatsByDays days={data.days} />
					</>
				)
			)}
		</div>
	);
};

export default Dashboard;
