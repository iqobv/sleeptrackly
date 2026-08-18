'use client';

import { leaveChallenge } from '@/api/challenge/leaveChallenge.api';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Button, ConfirmModal } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface LeaveChallengeProps {
	id: string;
}

export const LeaveChallenge = ({ id }: LeaveChallengeProps) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: () => leaveChallenge(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.challenges.all });
			router.push(PRIVATE_PAGES.CHALLENGES.ALL);
			toast.success('You have successfully left the challenge.');
		},
		onError: (e) => {
			if (isAxiosError(e) && e.response?.data.message) {
				toast.error(e.response.data.message);
				return;
			}

			toast.error('Something went wrong. Please try again later.');
		},
	});

	return (
		<ConfirmModal
			text="Are you sure you want to leave this challenge?"
			title="Leave Challenge"
			onConfirm={() => mutate()}
		>
			<Button size="sm" variant="link" fullWidth>
				Leave Challenge
			</Button>
		</ConfirmModal>
	);
};
