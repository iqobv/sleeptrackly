import { CalendarLoader } from '../Calendar/CalendarLoader';
import { ChallengeObjectiveLoader } from '../ChallengeObjective/ChallengeObjectiveLoader';
import { ChallengePrizeLoader } from '../ChallengePrize/ChallengePrizeLoader';
import { ChallengeRulesLoader } from '../ChallengeRules/ChallengeRulesLoader';
import { ChallengeSummaryLoader } from '../ChallengeSummary/ChallengeSummaryLoader';
import styles from './Challenge.module.scss';

export const ChallengeLoader = () => (
	<div className={styles.container}>
		<div className={styles.details}>
			<ChallengeObjectiveLoader />
			<ChallengeRulesLoader />
			<CalendarLoader />
		</div>
		<div className={styles.prize}>
			<ChallengePrizeLoader />
		</div>
	</div>
);

export const ChallengePageLoader = () => (
	<>
		<ChallengeSummaryLoader />
		<ChallengeLoader />
	</>
);
