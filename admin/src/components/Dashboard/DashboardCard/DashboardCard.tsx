'use client';

import { DashboardMetric } from '@/types/dashboard/dashboard.types';
import { SectionHeader, Typography } from '@shared/ui';
import styles from './DashboardCard.module.scss';

interface DashboardCardProps {
	title: string;
	tooltip?: string;
	data: DashboardMetric;
}

export const DashboardCard = ({ title, tooltip, data }: DashboardCardProps) => {
	return (
		<div className={styles.container}>
			<SectionHeader
				title={title}
				titleProps={{
					variant: 'h4',
					as: 'p',
				}}
				padding={0}
			/>
			<div>
				<Typography>{data.current}</Typography>
				<Typography>{data.previous}</Typography>
				<Typography>{data.percentageChange}%</Typography>
			</div>
		</div>
	);
};
