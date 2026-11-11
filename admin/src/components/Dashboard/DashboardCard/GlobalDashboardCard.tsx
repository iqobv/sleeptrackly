'use client';

import { Typography } from '@shared/ui';
import { DashboardCardWrapper } from './DashboardCardWrapper';

interface GlobalDashboardCardProps {
	title: string;
	tooltip?: string;
	value: number;
}

export const GlobalDashboardCard = ({
	title,
	value,
	tooltip,
}: GlobalDashboardCardProps) => {
	return (
		<DashboardCardWrapper title={title} tooltip={tooltip}>
			<Typography weight="bold">{value}</Typography>
		</DashboardCardWrapper>
	);
};
