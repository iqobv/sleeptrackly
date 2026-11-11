'use client';

import {
	SectionHeader,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@shared/ui';
import { MdInfoOutline } from 'react-icons/md';
import styles from './DashboardCard.module.scss';

interface DashboardCardWrapperProps {
	title: string;
	tooltip?: string;
	children: React.ReactNode;
}

export const DashboardCardWrapper = ({
	children,
	title,
	tooltip,
}: DashboardCardWrapperProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<SectionHeader
					title={title}
					titleProps={{
						variant: 'h5',
						weight: 'semibold',
						as: 'p',
					}}
					padding={0}
				/>
				{tooltip && (
					<Tooltip>
						<TooltipTrigger asChild>
							<span style={{ display: 'inline-flex', cursor: 'pointer' }}>
								<MdInfoOutline />
							</span>
						</TooltipTrigger>
						<TooltipContent>{tooltip}</TooltipContent>
					</Tooltip>
				)}
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
};
