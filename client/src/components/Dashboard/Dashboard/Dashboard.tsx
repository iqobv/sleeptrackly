'use client';

import { getStatisticsByWeekForUser } from '@/api';
import { useAuth, useWeekPagination } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import SleepChart from '../SleepChart/SleepChart';
import Stats from '../Stats/Stats';
import StatsByDays from '../StatsByDays/StatsByDays';
import WeekPagination from '../WeekPagination/WeekPagination';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
	const { isAuthenticated } = useAuth();
	const { selectedWeek } = useWeekPagination();

	const { data } = useQuery({
		queryKey: ['dashboard', selectedWeek],
		queryFn: () => getStatisticsByWeekForUser(selectedWeek),
		enabled: !!isAuthenticated,
	});

	return (
		<div className={styles['dashboard']}>
			{data && (
				<>
					<WeekPagination totalWeeks={data?.totalWeeks} days={data?.days} />
					<Stats data={data.statistics} />
					<SleepChart data={data.days} />
					<StatsByDays days={data.days} />
				</>
			)}
		</div>
	);
};

export default Dashboard;
