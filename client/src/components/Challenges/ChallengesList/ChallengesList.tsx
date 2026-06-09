'use client';

import { Challenge } from '@/types';
import { List } from '@shared/ui';
import ChallengeItem from './ChallengeItem/ChallengeItem';
import styles from './ChallengesList.module.scss';

interface ChallengesListProps {
	data: Challenge[];
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
					className={styles.list}
				/>
			)}
		</>
	);
};

export default ChallengesList;
