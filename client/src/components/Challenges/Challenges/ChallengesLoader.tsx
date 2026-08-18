import { SectionHeaderLoader } from '@shared/ui';
import { ActiveChallengesLoader } from './ActiveChallenges/ActiveChallengesLoader';
import { AvailableChallengesLoader } from './AvailableChallenges/AvailableChallengesLoader';
import { ChallengeRecoveriesTokensLoader } from './ChallengeRecoveriesTokens/ChallengeRecoveriesTokensLoader';
import styles from './Challenges.module.scss';

export const ChallengesLoader = () => {
	return (
		<div className={styles.challenges}>
			<SectionHeaderLoader rightSlot={<ChallengeRecoveriesTokensLoader />} />
			<ActiveChallengesLoader />
			<AvailableChallengesLoader />
		</div>
	);
};
