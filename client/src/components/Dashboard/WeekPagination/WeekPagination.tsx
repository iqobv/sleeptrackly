'use client';

import { DashboardDay } from '@/types/dashboard/dashboard.types';
import { Button } from '@shared/ui';
import { appDayjs } from '@shared/utils';
import { IconBaseProps } from 'react-icons';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { DashboardCard } from '../DashboardCard/DashboardCard';
import styles from './WeekPagination.module.scss';
import { useWeekPagination } from './useWeekPagination.hook';

interface WeekPaginationProps {
	days: DashboardDay[];
	hasMore: boolean;
}

const iconProps: IconBaseProps = {
	size: 20,
	suppressHydrationWarning: true,
};

const weekLabelFormat = 'MMM D';
const dateFormat = 'YYYY-MM-DD';

export const WeekPagination = ({ days, hasMore }: WeekPaginationProps) => {
	const { date, handleWeekChange } = useWeekPagination();

	const isNextDisabled = appDayjs(date, dateFormat).isSame(
		appDayjs(),
		'isoWeek',
	);
	const isPrevDisabled = !hasMore;

	const handlePrevWeek = () =>
		!isPrevDisabled &&
		handleWeekChange(appDayjs(date).subtract(1, 'week').format(dateFormat));

	const handleNextWeek = () =>
		!isNextDisabled &&
		handleWeekChange(appDayjs(date).add(1, 'week').format(dateFormat));

	const firstDay = days[0]?.day;
	const lastDay = days[days.length - 1]?.day;

	const weekLabel =
		firstDay && lastDay
			? `${appDayjs(firstDay).format(weekLabelFormat)} - ${appDayjs(lastDay).format(weekLabelFormat)}`
			: '';

	return (
		<div className={`${styles.weekPagination}`}>
			<DashboardCard className={styles.container}>
				<Button
					onClick={handlePrevWeek}
					isIcon
					variant="text"
					isRounded
					size="sm"
					disabled={isPrevDisabled}
				>
					<MdKeyboardArrowLeft {...iconProps} />
				</Button>
				<div className={styles.label}>
					<p>{weekLabel}</p>
				</div>
				<Button
					onClick={handleNextWeek}
					isIcon
					variant="text"
					disabled={isNextDisabled}
					size="sm"
					isRounded
				>
					<MdKeyboardArrowRight {...iconProps} />
				</Button>
			</DashboardCard>
		</div>
	);
};
