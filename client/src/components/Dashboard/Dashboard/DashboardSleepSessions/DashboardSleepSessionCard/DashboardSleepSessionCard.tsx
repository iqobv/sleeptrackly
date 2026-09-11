'use client';

import { DashboardCard } from '@/components/Dashboard/DashboardCard/DashboardCard';
import { ClientDateRange } from '@/components/UI';
import { DashboardDay } from '@/types/dashboard/dashboard.types';
import { Button, Divider, Typography } from '@shared/ui';
import { formatDate, transformSecondsToHours } from '@shared/utils';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { MdAdd, MdOutlineExpandMore } from 'react-icons/md';
import styles from './DashboardSleepSessionCard.module.scss';
import { DashboardSleepSessionCardDropdown } from './DashboardSleepSessionCardDropdown/DashboardSleepSessionCardDropdown';
import { SleepSessionCreate } from './DashboardSleepSessionCardDropdown/SleepSessionCreate';

interface DashboardSleepSessionCardProps {
	moreThanOneEntry?: boolean;
	data: DashboardDay;
}

export const DashboardSleepSessionCard = ({
	data,
	moreThanOneEntry,
}: DashboardSleepSessionCardProps) => {
	const [expanded, setExpanded] = useState(false);

	const day = new Date(data.day);
	const hasData = data.data && data.data.length > 0;

	const formattedWeekday = formatDate(data.day, {
		weekday: 'long',
		day: 'numeric',
		month: 'short',
	});

	const totalDuration = useMemo(
		() => data.data.reduce((acc, entry) => acc + entry.sleepDuration, 0),
		[data],
	);

	const onToggleExpand = () => setExpanded((prev) => !prev);

	return (
		<div className={clsx(styles.container, expanded && styles.expanded)}>
			<DashboardCard className={styles.card}>
				<div className={styles.content}>
					<div className={styles.info}>
						<Typography variant="subtitle1">{formattedWeekday}</Typography>
						{hasData ? (
							<>
								<Typography variant="h6" as="p" weight="semibold">
									{transformSecondsToHours(totalDuration)}
								</Typography>
								{!moreThanOneEntry && data.data[0] && (
									<ClientDateRange
										start={data.data[0].sleepStart}
										end={data.data[0].sleepEnd}
										color="secondary"
									/>
								)}
							</>
						) : (
							<Typography color="secondary">No sleep sessions</Typography>
						)}
					</div>
					{moreThanOneEntry ? (
						<Button isIcon variant="text" isRounded onClick={onToggleExpand}>
							<MdOutlineExpandMore size={20} className={styles.icon} />
						</Button>
					) : (
						<DashboardSleepSessionCardDropdown
							date={day}
							showAddButton
							isEmpty={!hasData}
							sleepEntry={data.data[0]}
						/>
					)}
				</div>
			</DashboardCard>
			{moreThanOneEntry && hasData && (
				<DashboardCard className={styles.entriesContainer}>
					<div className={styles.entries}>
						{data.data.map((entry) => (
							<React.Fragment key={entry.id}>
								<div className={styles.entry}>
									<div>
										<ClientDateRange
											start={entry.sleepStart}
											end={entry.sleepEnd}
											color="secondary"
										/>
										<Typography variant="h6" as="p">
											{transformSecondsToHours(entry.sleepDuration)}
										</Typography>
									</div>
									<DashboardSleepSessionCardDropdown
										date={day}
										isEmpty={false}
										sleepEntry={entry}
									/>
								</div>
								<Divider />
							</React.Fragment>
						))}
						<div className={styles.entry}>
							<SleepSessionCreate date={day}>
								<Button variant="text" fullWidth>
									<MdAdd size={22} />
									Add Sleep Session
								</Button>
							</SleepSessionCreate>
						</div>
					</div>
				</DashboardCard>
			)}
		</div>
	);
};
