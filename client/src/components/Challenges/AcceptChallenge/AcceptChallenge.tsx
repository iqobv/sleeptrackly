'use client';

import { acceptChallenge } from '@/api/challenge/acceptChallenge.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Button, ButtonProps } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

interface AcceptChallengeProps {
	id: string;
	children?: React.ReactNode;
	buttonProps?: Omit<ButtonProps, 'children' | 'asChild' | 'onClick'>;
}

export const AcceptChallenge = ({
	id,
	children = 'Accept Challenge',
	buttonProps,
}: AcceptChallengeProps) => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: () => acceptChallenge(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.challenges.all,
			});
			toast.success('Challenge accepted successfully!');
		},
		onError: (e) => {
			if (isAxiosError(e) && e.response?.data.message) {
				toast.error(e.response.data.message);
				return;
			}

			toast.error('Failed to accept the challenge. Please try again.');
		},
	});

	return (
		<Button
			onClick={() => mutate()}
			variant={buttonProps?.variant || 'contained'}
			color={buttonProps?.color || 'primary'}
			size={buttonProps?.size || 'md'}
			fullWidth={buttonProps?.fullWidth || true}
			loading={isPending}
			{...buttonProps}
		>
			{children}
		</Button>
	);
};
