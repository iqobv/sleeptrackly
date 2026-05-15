'use client';

import { ChallengeFull } from '@/types';
import styles from './ChallengeInfo.module.scss';
import { CHALLENGE_INFO_FIELDS } from './challengeInfoField';

interface ChallengeInfoProps {
	data: ChallengeFull;
}

const ChallengeInfo = ({ data }: ChallengeInfoProps) => {
	if (!data) return null;

	return (
		<div className={styles['challenge-info']}>
			<div className={styles['challenge-info__table']}>
				{CHALLENGE_INFO_FIELDS(data).map((el) => (
					<div key={el.name} className={styles['challenge-info__table-row']}>
						<div className={styles['challenge-info__table-name']}>
							{el.name}
						</div>
						<div className={styles['challenge-info__table-value']}>
							{el.value}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChallengeInfo;
