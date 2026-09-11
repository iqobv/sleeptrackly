'use client';

import { useAuth } from '@/hooks/useAuth.hook';
import { useCountdown } from '@/hooks/useCountdown.hook';
import { Typography } from '@shared/ui';
import { MdOutlineShield } from 'react-icons/md';
import styles from './ChallengeRecoveriesTokens.module.scss';

export const ChallengeRecoveriesTokens = () => {
	const { formatted } = useCountdown();

	const { user } = useAuth();

	return (
		<div className={styles.tokens}>
			<MdOutlineShield size={32} />
			<div>
				<Typography variant="h5" as="p">
					{user?.challengeRecoveries || 0} tokens remaining
				</Typography>
				<Typography variant="subtitle2" as="p" color="secondary">
					Resets in: {formatted}
				</Typography>
			</div>
		</div>
	);
};
