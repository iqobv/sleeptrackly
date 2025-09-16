'use client';

import { useWeekPagination } from '@/hooks';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { Button } from '@/components/UI';
import { IconBaseProps } from 'react-icons';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import styles from './WeekPagination.module.scss';

interface WeekPaginationProps {
	totalWeeks: number;
	days: { day: string }[];
}

const iconProps: IconBaseProps = {
	size: 30,
	suppressHydrationWarning: true,
};

const WeekPagination = ({ totalWeeks, days }: WeekPaginationProps) => {
	const { selectedWeek: week, setSelectedWeek } = useWeekPagination();

	const handlePrevWeek = () =>
		setSelectedWeek(week < totalWeeks - 1 ? week + 1 : week);
	const handleNextWeek = () => setSelectedWeek(week === 0 ? week : week - 1);

	const [weekLabel, setWeekLabel] = useState('');

	useEffect(() => {
		const firstDay = days[0].day;
		const lastDay = days[days.length - 1].day;

		setWeekLabel(
			`${dayjs(firstDay).format('DD.MM.YYYY')} - ${dayjs(lastDay).format(
				'DD.MM.YYYY'
			)}`
		);
	}, [days]);

	return (
		<div className={styles['week-pagination']}>
			<div className={styles['week-pagination__container']}>
				<Button
					className={styles['week-pagination__button']}
					onClick={handlePrevWeek}
					disabled={week === totalWeeks - 1}
				>
					<MdKeyboardArrowLeft size={40} {...iconProps} />
				</Button>
				<div className={styles['week-pagination__label']}>
					<p>Week</p>
					<p>{weekLabel}</p>
				</div>
				<Button
					className={styles['week-pagination__button']}
					onClick={handleNextWeek}
					disabled={week === 0}
				>
					<MdKeyboardArrowRight {...iconProps} />
				</Button>
			</div>
		</div>
	);
};

export default WeekPagination;
