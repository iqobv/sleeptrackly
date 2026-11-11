'use client';

import { DashboardMetric } from '@/types/dashboard/dashboard.types';
import { Typography } from '@shared/ui';
import clsx from 'clsx';
import styles from './DashboardCard.module.scss';
import { DashboardCardWrapper } from './DashboardCardWrapper';
import { getTrendingIcon } from './trendingIcons';

interface DashboardCardProps {
	title: string;
	tooltip?: string;
	data: DashboardMetric;
}

export const DashboardCard = ({ title, tooltip, data }: DashboardCardProps) => {
	const { icon: Icon, condition } = getTrendingIcon(data.percentageChange, 0);

	return (
		<DashboardCardWrapper title={title} tooltip={tooltip}>
			<div className={styles.currentWeek}>
				<Typography weight="bold">{data.current}</Typography>
				<Typography className={clsx(styles.percentage, styles[condition])}>
					{<Icon />} {data.percentageChange}%
				</Typography>
			</div>
			<div className={styles.previousWeek}>
				<Typography>
					Previous Week:{' '}
					<Typography as="span" weight="semibold">
						{data.previous}
					</Typography>
				</Typography>
				<Typography
					color={
						condition === 'negative'
							? 'error'
							: condition === 'positive'
								? 'success'
								: 'muted'
					}
				>
					{condition === 'positive' && '+'}
					{data.current - data.previous}
				</Typography>
			</div>
		</DashboardCardWrapper>
	);
};
