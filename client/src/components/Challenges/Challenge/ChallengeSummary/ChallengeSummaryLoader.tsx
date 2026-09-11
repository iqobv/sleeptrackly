import { SectionHeaderLoader } from '@shared/ui';
import { ChallengeTagLoader } from '../../ChallengeTag/ChallengeTagLoader';
import styles from './ChallengeSummary.module.scss';

export const ChallengeSummaryLoader = () => (
	<div className={styles.summary}>
		<SectionHeaderLoader gap={5} leftSlot={<ChallengeTagLoader />} />
	</div>
);
