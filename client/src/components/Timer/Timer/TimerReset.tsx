'use client';

import { resetSleepStatus } from '@/api/user/sleepStatus.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Button, ConfirmModal } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface TimerResetProps {
	resetTimer: () => void;
}

export const TimerReset = ({ resetTimer }: TimerResetProps) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: resetSleepStatus,
		onSuccess: () => {
			resetTimer();
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.timer.one,
			});
		},
	});

	return (
		<>
			<ConfirmModal
				title="Reset Timer"
				text="Are you sure you want to reset the timer? This action cannot be undone."
				onConfirm={() => mutate()}
			>
				<Button size="sm" color="secondary">
					Reset Timer
				</Button>
			</ConfirmModal>
		</>
	);
};
