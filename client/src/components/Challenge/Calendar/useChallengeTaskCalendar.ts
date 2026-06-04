'use client';

import { ChallengeFrequency, ChallengeTask } from '@/types';
import dayjs from 'dayjs';
import { useState } from 'react';

export const useChallengeTaskCalendar = ({
	tasks,
	mode,
}: {
	tasks: ChallengeTask[];
	mode: ChallengeFrequency;
}) => {
	const [selectedTask, setSelectedTask] = useState<ChallengeTask | null>(null);

	const createWeekArr = (start: string, end?: string) => {
		if (!end) return [dayjs(start).toDate()];
		const dates: Date[] = [];
		let current = dayjs(start);
		while (current.isSameOrBefore(end, 'day')) {
			dates.push(current.toDate());
			current = current.add(1, 'day');
		}
		return dates;
	};

	const completedGroups = tasks
		.filter((t) => t.isCompleted)
		.map((t) =>
			mode === ChallengeFrequency.DAILY
				? [dayjs(t.startDate).toDate()]
				: createWeekArr(t.startDate.toString(), t.endDate.toString()),
		);

	const pendingGroups = tasks
		.filter((t) => !t.isCompleted)
		.map((t) =>
			mode === ChallengeFrequency.DAILY
				? [dayjs(t.startDate).toDate()]
				: createWeekArr(t.startDate.toString(), t.endDate.toString()),
		);

	const unsortedDates = [...completedGroups, ...pendingGroups].flat();

	const allDates = unsortedDates.sort((a, b) => a.getTime() - b.getTime());

	const handleClick = (date: Date) => {
		const matchedGroup = [...completedGroups, ...pendingGroups].find((g) =>
			g.some((d) => dayjs(d).isSame(date, 'day')),
		);

		if (!matchedGroup) return;
		const formatted = dayjs(matchedGroup[0]).format('YYYY-MM-DD');
		const task = tasks.find((t) =>
			t.startDate.toString().startsWith(formatted),
		);
		setSelectedTask(task || null);
	};

	return {
		completedGroups,
		pendingGroups,
		allDates,
		handleClick,
		selectedTask,
	};
};
