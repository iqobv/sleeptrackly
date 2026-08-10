'use client';

import { restoreChallenge } from '@/api/challenge/restoreChallenge.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useAuth } from '@/hooks/useAuth.hook';
import { ChallengeStatus } from '@shared/types';
import { Button, ButtonProps } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

interface RestoreChallengeProps {
	id: string;
	children?: React.ReactNode;
	usedRecoveries: number;
	maxRecoveries: number;
	status: ChallengeStatus;
	buttonProps?: Omit<ButtonProps, 'children' | 'asChild' | 'onClick'>;
}

export const RestoreChallenge = ({
	id,
	children = 'Restore Challenge',
	buttonProps,
	maxRecoveries,
	usedRecoveries,
	status,
}: RestoreChallengeProps) => {
	const { user } = useAuth();

	const queryClient = useQueryClient();

	const canRecover =
		(user &&
			user.challengeRecoveries > 0 &&
			status === ChallengeStatus.FROZEN &&
			usedRecoveries < maxRecoveries) ??
		false;

	const { mutate, isPending } = useMutation({
		mutationFn: () => restoreChallenge(id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.challenges.all,
			});
			toast.success(data.message);
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
		<Button
			onClick={() => mutate()}
			variant={buttonProps?.variant || 'contained'}
			color={buttonProps?.color || 'primary'}
			size={buttonProps?.size || 'md'}
			fullWidth={buttonProps?.fullWidth || true}
			loading={isPending}
			disabled={!canRecover}
			{...buttonProps}
		>
			{children}
		</Button>
	);
};
