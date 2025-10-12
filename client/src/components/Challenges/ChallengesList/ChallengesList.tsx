'use client';

import { List } from '@/components/UI';
import { IChallenge } from '@/types';
import ChallengeItem from './ChallengeItem/ChallengeItem';
import styles from './ChallengesList.module.scss';

interface ChallengesListProps {
	data: IChallenge[];
}

const ChallengesList = ({ data }: ChallengesListProps) => {
	return (
		<>
			{data && (
				<List
					items={data}
					renderItem={(challenge) => (
						<ChallengeItem key={challenge.id} challenge={challenge} />
					)}
					isHorizontal
					gap={20}
					className={styles['challenges-list']}
				/>
			)}
		</>
	);
};

export default ChallengesList;
