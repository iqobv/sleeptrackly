'use client';

import { Calendar as UICalendar } from '@/components/UI';
import { ChallengeFrequency, ChallengeFull } from '@/types';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import TaskSumary from '../TaskSummary/TaskSummary';
import styles from './Calendar.module.scss';
import { useChallengeTaskCalendar } from './useChallengeTaskCalendar';

dayjs.extend(isSameOrBefore);

interface CalendarProps {
	data: ChallengeFull;
	mode: ChallengeFrequency;
}

const Calendar = ({ data, mode }: CalendarProps) => {
	const tasks = data.tasks || [];

	const {
		allDates,
		completedGroups,
		pendingGroups,
		selectedTask,
		handleClick,
	} = useChallengeTaskCalendar({
		tasks,
		mode,
	});

	return (
		<div className={styles['calendar']}>
			<div className={styles['calendar__container']}>
				<UICalendar
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
				/>
			</div>
			<TaskSumary challenge={data} selectedDate={selectedTask} />
		</div>
	);
};

export default Calendar;
