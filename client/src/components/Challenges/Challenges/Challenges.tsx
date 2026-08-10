'use client';

import { SectionHeader } from '@shared/ui';
import { ActiveChallenges } from './ActiveChallenges/ActiveChallenges';
import { AvailableChallenges } from './AvailableChallenges/AvailableChallenges';
import { ChallengeRecoveriesTokens } from './ChallengeRecoveriesTokens/ChallengeRecoveriesTokens';
import styles from './Challenges.module.scss';

export const Challenges = () => {
	return (
		<div className={styles.challenges}>
			<SectionHeader
				title="Challenges"
				wrapperClassName={styles.header}
				rightSlot={<ChallengeRecoveriesTokens />}
				rightSlotClassName={styles.rightSlot}
			/>
			<ActiveChallenges />
			<AvailableChallenges />
		</div>
	);
};
