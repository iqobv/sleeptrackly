'use client';

import { ChallengeFull } from '@/types/challenge/challenge.types';
import { ChallengeStatus } from '@shared/types';
import { Typography } from '@shared/ui';
import { RestoreChallenge } from '../../RestoreChallenge/RestoreChallenge';
import { ChallengeCardContainer } from '../ChallengeCardContainer/ChallengeCardContainer';
import styles from './FrozenCard.module.scss';

interface FrozenCardProps {
	challenge: ChallengeFull;
}

export const FrozenCard = ({ challenge }: FrozenCardProps) => {
	return (
		<ChallengeCardContainer
			className={styles.card}
			title="Challenge is Frozen"
			titleProps={{
				color: 'error',
			}}
			gap={5}
		>
			<div className={styles.content}>
				<Typography>
					You missed a day in the challenge. Use a recovery token to restore
					your challenge before it expires in 48 hours.
				</Typography>
				<RestoreChallenge
					id={challenge.id}
					maxRecoveries={challenge.maxRecoveries}
					usedRecoveries={challenge.userChallenge?.usedRecoveries ?? 0}
					status={challenge.userChallenge?.status ?? ChallengeStatus.ACTIVE}
					buttonProps={{
						className: styles.button,
					}}
				>
					Use Restore Token
				</RestoreChallenge>
			</div>
		</ChallengeCardContainer>
	);
};
