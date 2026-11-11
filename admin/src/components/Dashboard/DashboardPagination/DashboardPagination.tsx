'use client';

import { Button, Typography } from '@shared/ui';
import { appDayjs } from '@shared/utils';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import styles from './DashboardPagination.module.scss';
import { useWeekPagination } from './useWeekPagination.hook';

interface DashboardPaginationProps {
	hasPreviousWeek: boolean;
}

const weekLabelFormat = 'MMM D';
const dateFormat = 'YYYY-MM-DD';

export const DashboardPagination = ({
	hasPreviousWeek,
}: DashboardPaginationProps) => {
	const { date, handleWeekChange } = useWeekPagination();

	const isNextDisabled = appDayjs(date, dateFormat).isSame(
		appDayjs(),
		'isoWeek',
	);
	const isPrevDisabled = !hasPreviousWeek;

	const handlePrevWeek = () =>
		!isPrevDisabled &&
		handleWeekChange(appDayjs(date).subtract(1, 'week').format(dateFormat));

	const handleNextWeek = () =>
		!isNextDisabled &&
		handleWeekChange(appDayjs(date).add(1, 'week').format(dateFormat));

	const firstDay = appDayjs(date).startOf('isoWeek').format(weekLabelFormat);
	const lastDay = appDayjs(date).endOf('isoWeek').format(weekLabelFormat);

	return (
		<div className={styles.container}>
			<Button
				onClick={handlePrevWeek}
				disabled={isPrevDisabled}
				isIcon
				isRounded
				color="secondary"
			>
				<MdArrowBackIosNew />
			</Button>
			<Typography>
				{firstDay} - {lastDay}
			</Typography>
			<Button
				onClick={handleNextWeek}
				disabled={isNextDisabled}
				isIcon
				isRounded
				color="secondary"
			>
				<MdArrowForwardIos />
			</Button>
		</div>
	);
};
