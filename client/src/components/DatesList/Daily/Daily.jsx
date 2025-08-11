import dayjs from 'dayjs';
import { useState } from 'react';

import Calendar from '../Calendar/Calendar';
import TaskSummary from '../TaskSummary/TaskSummary';

import 'react-day-picker/dist/style.css';

const Daily = ({ data }) => {
	const tasks = data.tasks || [];
	const [selectedDate, setSelectedDate] = useState(null);

	const completedDates = tasks
		.filter((task) => task.isCompleted)
		.map((task) => dayjs(task.startDate).toDate());

	const pendingDates = tasks
		.filter((task) => !task.isCompleted)
		.map((task) => dayjs(task.startDate).toDate());

	const allDates = [...completedDates, ...pendingDates];

	const handleDayClick = (date) => {
		const formatted = dayjs(date).format('YYYY-MM-DD');
		const taskForDate = tasks.find((task) => task.startDate === formatted);
		setSelectedDate(taskForDate || null);
	};

	const modifiers = {
		completed: completedDates,
		pending: pendingDates,
		hidden: (date) => {
			return !allDates.some((d) => dayjs(d).isSame(date, 'day'));
		},
	};

	return (
		<div>
			<Calendar
				allDates={allDates}
				handleDayClick={handleDayClick}
				modifiers={modifiers}
			/>

			{selectedDate && (
				<TaskSummary selectedDate={selectedDate} challenge={data} />
			)}
		</div>
	);
};

export default Daily;
