'use client';

import { useWeekPagination } from '@/hooks';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { Button } from '@/components/UI';
import { IconBaseProps } from 'react-icons';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import DashboardCard from '../DashboardCard/DashboardCard';
import styles from './WeekPagination.module.scss';

interface WeekPaginationProps {
	totalWeeks: number;
	days: { day: string }[];
}

const iconProps: IconBaseProps = {
	size: 20,
	suppressHydrationWarning: true,
};

const weekLabelFormat = 'MMM D';

const WeekPagination = ({ totalWeeks, days }: WeekPaginationProps) => {
	const [weekLabel, setWeekLabel] = useState('');

	const { selectedWeek: week, changeWeek } = useWeekPagination();

	const handlePrevWeek = () =>
		changeWeek(week < totalWeeks - 1 ? week + 1 : week);
	const handleNextWeek = () => changeWeek(week === 0 ? week : week - 1);

	useEffect(() => {
		const firstDay = days[0].day;
		const lastDay = days[days.length - 1].day;

		setWeekLabel(
			`${dayjs(firstDay).format(weekLabelFormat)} - ${dayjs(lastDay).format(weekLabelFormat)}`,
		);
	}, [days]);

	return (
		<div className={`${styles['week-pagination']}`}>
			<DashboardCard className={styles['week-pagination__container']}>
				<Button
					onClick={handlePrevWeek}
					isIcon
					variant="text"
					isRounded
					size="sm"
					disabled={totalWeeks > 0 ? week === totalWeeks - 1 : true}
				>
					<MdKeyboardArrowLeft {...iconProps} />
				</Button>
				<div className={styles['week-pagination__label']}>
					<p>{weekLabel}</p>
				</div>
				<Button
					onClick={handleNextWeek}
					isIcon
					variant="text"
					disabled={week === 0}
					size="sm"
					isRounded
				>
					<MdKeyboardArrowRight {...iconProps} />
				</Button>
			</DashboardCard>
		</div>
	);
};

export default WeekPagination;
