'use client';

import { resetSleepStatus } from '@/api/user/sleepStatus.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Button, ConfirmModal } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface TimerResetProps {
	resetTimer: () => void;
}

export const TimerReset = ({ resetTimer }: TimerResetProps) => {
	const queryClient = useQueryClient();

	const [open, setOpen] = useState(false);

	const onClose = () => setOpen((prev) => !prev);

	const { mutate } = useMutation({
		mutationFn: resetSleepStatus,
		onSuccess: () => {
			resetTimer();
			onClose();
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.timer.one,
			});
		},
	});

	return (
		<>
			<Button size="sm" color="secondary" onClick={onClose}>
				Reset Timer
			</Button>
			<ConfirmModal
				isOpen={open}
				onClose={onClose}
				title="Reset Timer"
				text="Are you sure you want to reset the timer? This action cannot be undone."
				onConfirm={mutate}
			/>
		</>
	);
};
