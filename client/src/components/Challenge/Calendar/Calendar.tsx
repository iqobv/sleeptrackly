'use client';

import { ChallengeFull } from '@/types/challenge/challenge.types';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import styles from './Calendar.module.scss';

dayjs.extend(isSameOrBefore);

interface CalendarProps {
	data: ChallengeFull;
	mode: 'DAILY';
}

export const Calendar = ({ data, mode }: CalendarProps) => {
	// const tasks = [];

	// const {
	// 	allDates,
	// 	completedGroups,
	// 	pendingGroups,
	// 	selectedTask,
	// 	handleClick,
	// } = useChallengeTaskCalendar({
	// 	tasks,
	// 	mode,
	// });

	return (
		<div className={styles.calendar}>
			<div className={styles.container}>
				{/* <UICalendar
					mode="single"
					selected={
						selectedTask ? dayjs(selectedTask.startDate).toDate() : undefined
					}
					onDayClick={handleClick}
					modifiers={{
						completed: completedGroups.flat(),
						pending: pendingGroups.flat(),
						hidden: (date) =>
							!allDates.some((d) => dayjs(d).isSame(date, 'day')),
					}}
					startMonth={allDates[0]}
					endMonth={allDates[allDates.length - 1]}
				/> */}
			</div>
			{/* <TaskSummary challenge={data} selectedDate={selectedTask} /> */}
		</div>
	);
};
