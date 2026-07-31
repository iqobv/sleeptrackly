'use client';

import { Challenge } from '@/types/challenge/challenge.types';
import { SectionHeader } from '@shared/ui';
import { ChallengesList } from '../ChallengesList/ChallengesList';

interface ActiveChallengesProps {
	data: Challenge[];
}

export const ActiveChallenges = ({ data }: ActiveChallengesProps) => {
	const activeChallenges = data;

	if (activeChallenges.length === 0) return null;

	return (
		<div>
			<SectionHeader
				title="Active Challenges"
				titleProps={{
					variant: 'h2',
				}}
				description="Track and manage your active challenges."
				padding={5}
			/>
			<ChallengesList data={activeChallenges} />
		</div>
	);
};
