'use client';

import { ChallengeFull } from '@/types';
import { Typography } from '@shared/ui';
import styles from './ChallengeInfo.module.scss';
import { CHALLENGE_INFO_FIELDS } from './challengeInfoField';

interface ChallengeInfoProps {
	data: ChallengeFull;
}

export const ChallengeInfo = ({ data }: ChallengeInfoProps) => {
	if (!data) return null;

	return (
		<div className={styles.info}>
			<div className={styles.table}>
				{CHALLENGE_INFO_FIELDS(data).map((el) => (
					<div key={el.name} className={styles.row}>
						<Typography color="secondary">{el.name}</Typography>
						<Typography>{el.value}</Typography>
					</div>
				))}
			</div>
		</div>
	);
};
