'use client';

import { restoreStreak } from '@/api/streak/restoreStreak.api';
import { StreakIcon } from '@/assets/icons';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useAuth } from '@/hooks/useAuth.hook';
import { formatNumber } from '@/utils/numberFormatter.util';
import { Button, SectionHeader, Typography } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import styles from './UserMenuStreak.module.scss';

export const UserMenuStreak = () => {
	const { user, isLoading } = useAuth();
	const queryClient = useQueryClient();

	const streak = user?.userStats.activeStreak;

	const { mutate, isPending } = useMutation({
		mutationFn: restoreStreak,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.me() });
		},
		onError: (error) => {
			if (isAxiosError(error) && error.response?.data.message) {
				toast.error(error.response.data.message);
				return;
			}

			toast.error(
				'An error occurred while restoring the streak. Please try again later.',
			);
		},
	});

	if (isLoading) return null;
	if (!user || !streak) return null;

	const isStreakFrozen = streak.status === 'FROZEN';
	const streakRestores = user.userStats.streakRestores;

	return (
		<div className={clsx(styles.container, isStreakFrozen && styles.frozen)}>
			<StreakIcon className={styles.streakIcon} width={48} height={48} />
			<div className={styles.info}>
				<SectionHeader
					title="Sleep Streak"
					description={formatNumber(streak.length)}
					titleProps={{
						as: 'p',
						variant: 'overline',
						color: 'secondary',
						style: { lineHeight: 1.1 },
					}}
					descriptionProps={{
						as: 'p',
						variant: 'h5',
						weight: 'bold',
					}}
					gap={6}
					padding={0}
				/>
				{isStreakFrozen && (
					<div className={styles.frozenInfo}>
						<Typography className={styles.frozenText}>
							Your streak is frozen.{' '}
							{streakRestores > 0
								? `You have ${streakRestores} restore(s) left.`
								: 'No restores left.'}
						</Typography>
						{streakRestores > 0 && (
							<Button onClick={() => mutate()} loading={isPending}>
								Restore Streak
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
