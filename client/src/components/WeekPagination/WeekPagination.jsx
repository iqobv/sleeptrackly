import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import styles from './WeekPagination.module.scss';

const WeekPagination = ({ setWeek, week, totalWeeks, days }) => {
	const [weekLabel, setWeekLabel] = useState('');

	const handlePrevWeek = () => setWeek((w) => (w < totalWeeks - 1 ? w + 1 : w));
	const handleNextWeek = () => setWeek((w) => (w === 0 ? w : w - 1));

	useEffect(() => {
		const firstDay = days[0].day;
		const lastDay = days[days.length - 1].day;

		setWeekLabel(
			`${dayjs(firstDay).format('DD.MM.YYYY')} - ${dayjs(lastDay).format(
				'DD.MM.YYYY',
			)}`,
		);
	}, [days]);

	return (
		<div className={styles['week-pagination']}>
			<div className={styles['week-pagination-container']}>
				<button
					className={styles['button-control']}
					onClick={handlePrevWeek}
					disabled={week === totalWeeks - 1}
				>
					{'<'}
				</button>
				<div className={styles['week-label']}>
					<p>Week</p>
					<p>{weekLabel}</p>
				</div>
				<button
					className={styles['button-control']}
					onClick={handleNextWeek}
					disabled={week === 0}
				>
					{'>'}
				</button>
			</div>
		</div>
	);
};

export default WeekPagination;
