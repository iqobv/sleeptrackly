'use client';

import { IChallenge } from '@/types/challenge.types.js';
import { useEffect, useState } from 'react';

import ChallengesList from '../ChallengesList/ChallengesList';
import styles from './ActiveChallenges.module.scss';

interface ActiveChallengesProps {
	data: IChallenge[];
}

const ActiveChallenges = ({ data }: ActiveChallengesProps) => {
	const [activeChallenges, setActiveChallenges] = useState<IChallenge[]>([]);

	useEffect(() => {
		if (data) setActiveChallenges(data.filter((c) => c.isStarted));
	}, [data]);

	if (activeChallenges.length === 0) return null;

	return (
		<div className={styles['active-challenges']}>
			<h2>Active Challenges</h2>
			<ChallengesList data={activeChallenges} />
		</div>
	);
};

export default ActiveChallenges;
