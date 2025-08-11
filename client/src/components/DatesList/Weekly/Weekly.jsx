import { useState } from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import Calendar from '../Calendar/Calendar';
import TaskSummary from '../TaskSummary/TaskSummary';

import styles from './Weekly.module.scss';

dayjs.extend(isSameOrBefore);

const Weekly = ({ data }) => {
	const tasks = data.tasks || [];

	const [selectedWeek, setSelectedWeek] = useState(null);

	const createWeekArr = (startDate, endDate) => {
		const dates = [];

		let currentDate = dayjs(startDate);

		while (currentDate.isSameOrBefore(endDate, 'day')) {
			dates.push(currentDate.clone().toDate());
			currentDate = currentDate.add(1, 'day');
		}

		return dates;
	};

	const completedWeeks = tasks
		.filter((task) => task.isCompleted)
		.map((task) => createWeekArr(task.startDate, task.endDate));

	const pendingWeeks = tasks
		.filter((task) => !task.isCompleted)
		.map((task) => createWeekArr(task.startDate, task.endDate));

	const allDates = [...completedWeeks, ...pendingWeeks];

	const modifiers = {
		completed: completedWeeks.flat(),
		pending: pendingWeeks.flat(),
		hidden: (date) =>
			!allDates.flat().some((d) => dayjs(d).isSame(date, 'day')),
	};

	const handleClick = (date) => {
		const matchedStartDate = allDates.find((group) =>
			group.some((d) => dayjs(d).isSame(date, 'day')),
		)?.[0];

		const formatted = dayjs(matchedStartDate).format('YYYY-MM-DD');
		const taskForDate = tasks.find((task) => task.startDate === formatted);

		setSelectedWeek(taskForDate);
	};

	return (
		<div>
			<Calendar
				allDates={allDates}
				handleDayClick={handleClick}
				modifiers={modifiers}
			/>

			{selectedWeek && (
				<TaskSummary
					selectedDate={selectedWeek}
					challenge={data}
					type="weekly"
				/>
			)}
		</div>
	);
};

export default Weekly;
