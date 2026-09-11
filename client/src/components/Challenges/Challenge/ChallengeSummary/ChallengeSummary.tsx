'use client';

import { CHALLENGE_TIERS } from '@/constants/challengeTier.constants';
import { ChallengeFull } from '@/types/challenge/challenge.types';
import { ChallengeStatus } from '@shared/types';
import { SectionHeader } from '@shared/ui';
import { ChallengeTag } from '../../ChallengeTag/ChallengeTag';
import styles from './ChallengeSummary.module.scss';

interface ChallengeSummaryProps {
	data: ChallengeFull;
}

export const ChallengeSummary = ({ data }: ChallengeSummaryProps) => {
	return (
		<div className={styles.summary}>
			<SectionHeader
				title={data?.translation.title}
				gap={5}
				leftSlot={
					<div className={styles.tags}>
						<ChallengeTag>{CHALLENGE_TIERS[data.tier]}</ChallengeTag>
						{data.userChallenge?.status === ChallengeStatus.FROZEN && (
							<ChallengeTag isFrozen>Frozen</ChallengeTag>
						)}
					</div>
				}
				titleProps={{
					variant: 'h2',
					as: 'h1',
				}}
			/>
		</div>
	);
};
