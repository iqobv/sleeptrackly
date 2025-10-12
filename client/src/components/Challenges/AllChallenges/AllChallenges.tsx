'use client';

import { IChallenge } from '@/types';
import ChallengesList from '../ChallengesList/ChallengesList';
import styles from './AllChallenges.module.scss';

interface AllChallengesProps {
	data: IChallenge[];
}

const AllChallenges = ({ data }: AllChallengesProps) => {
	return (
		<div className={styles['all-challenges']}>
			<h2>All Challenges</h2>
			{data.length > 0 ? <ChallengesList data={data} /> : <p>No challenges</p>}
		</div>
	);
};

export default AllChallenges;
