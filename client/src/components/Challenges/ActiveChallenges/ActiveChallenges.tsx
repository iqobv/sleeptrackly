'use client';

import { Challenge } from '@/types';
import { useEffect, useState } from 'react';

import { SectionHeader } from '@/components/UI';
import ChallengesList from '../ChallengesList/ChallengesList';

interface ActiveChallengesProps {
	data: Challenge[];
}

const ActiveChallenges = ({ data }: ActiveChallengesProps) => {
	const [activeChallenges, setActiveChallenges] = useState<Challenge[]>([]);

	useEffect(() => {
		if (data) setActiveChallenges(data.filter((c) => c.isStarted));
	}, [data]);

	if (activeChallenges.length === 0) return null;

	return (
		<div>
			<SectionHeader
				title="Active Challenges"
				titleComponent="h2"
				description="Track and manage your active challenges."
				padding={5}
			/>
			<ChallengesList data={activeChallenges} />
		</div>
	);
};

export default ActiveChallenges;
