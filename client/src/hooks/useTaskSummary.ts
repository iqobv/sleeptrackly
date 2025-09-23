'use client';

import { updateTask } from '@/api';
import { ChallengeTaskDto } from '@/dto';
import { IChallengeFull, IChallengeTask } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useTaskSummary = ({
	challenge,
	selectedDate,
}: {
	challenge: IChallengeFull;
	selectedDate: IChallengeTask | null;
}) => {
	const queryClient = useQueryClient();

	const task = useMemo(
		() => challenge?.tasks.find((t) => t.id === selectedDate?.id) || null,
		[challenge, selectedDate]
	);

	const info = useMemo(() => {
		if (!selectedDate) return '';
		const start = dayjs(selectedDate.startDate);
		const end = dayjs(selectedDate.endDate);
		return end.isSame(start, 'day')
			? start.format('DD.MM.YYYY')
			: `${start.format('DD.MM.YYYY')} - ${end.format('DD.MM.YYYY')}`;
	}, [selectedDate]);

	const canUpdate = useMemo(() => {
		if (!selectedDate || !challenge?.isStarted || task?.isCompleted)
			return false;
		return dayjs().isAfter(dayjs(selectedDate.startDate));
	}, [task, challenge, selectedDate]);

	const { mutate: markAsCompleted } = useMutation({
		mutationFn: ({
			challengeId,
			taskId,
			data,
		}: {
			challengeId: string;
			taskId: string;
			data: ChallengeTaskDto;
		}) => updateTask(challengeId, taskId, data),
		mutationKey: ['mark-as-completed'],
		onSuccess: () => {
			toast.success('Task marked as completed');
			queryClient.invalidateQueries({ queryKey: ['challenge', challenge?.id] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleMarkAsCompleted = () => {
		if (!selectedDate || !canUpdate) return;
		markAsCompleted({
			challengeId: challenge.id,
			taskId: task?.id || selectedDate.id,
			data: { isCompleted: true },
		});
	};

	return {
		info,
		canUpdate,
		isCompleted: task?.isCompleted,
		handleMarkAsCompleted,
	};
};
