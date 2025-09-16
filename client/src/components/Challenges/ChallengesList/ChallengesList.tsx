'use client';

import { IChallenge } from '@/types';
import ChallengeItem from './ChallengeItem/ChallengeItem';
import styles from './ChallengesList.module.scss';

interface ChallengesListProps {
	data: IChallenge[];
}

const ChallengesList = ({ data }: ChallengesListProps) => {
	return (
		<ul className={styles['challenges-list']}>
			{data &&
				data.map((challenge) => (
					<ChallengeItem key={challenge.id} challenge={challenge} />
				))}
		</ul>
	);
};

export default ChallengesList;
