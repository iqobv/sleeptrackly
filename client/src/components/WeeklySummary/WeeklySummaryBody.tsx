'use client';

import { getWeeklySummary } from '@/api/weeklySummary/weeklySummary.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { appDayjs } from '@shared/utils';
import { useQuery } from '@tanstack/react-query';
import styles from './WeeklySummary.module.scss';
import { WeeklySummaryCard } from './WeeklySummaryCard/WeeklySummaryCard';
import { WEEKLY_SUMMARY_CARDS } from './weeklySummaryCards';
import { WeeklySummaryLoader } from './WeeklySummaryLoader';

interface WeeklySummaryBodyProps {
	id: string;
}

export const WeeklySummaryBody = ({ id }: WeeklySummaryBodyProps) => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.weeklySummary.one(id),
		queryFn: () => getWeeklySummary(id),
		enabled: !!id,
	});

	if (isLoading) return <WeeklySummaryLoader />;
	if (!data) return null;

	return (
		<>
			<p className={styles.dateRange}>
				{appDayjs(data.weekStartDate).format('MMMM D, YYYY')} -{' '}
				{appDayjs(data.weekEndDate).format('MMMM D, YYYY')}
			</p>
			<div className={styles.cards}>
				{WEEKLY_SUMMARY_CARDS(data).map((card) => (
					<WeeklySummaryCard key={card.label} {...card} />
				))}
			</div>
		</>
	);
};
