'use client';

import { Challenge } from '@/types/challenge/challenge.types';
import { SectionHeader } from '@shared/ui';
import { ChallengesList } from '../ChallengesList/ChallengesList';

interface AllChallengesProps {
	data: Challenge[];
}

export const AllChallenges = ({ data }: AllChallengesProps) => {
	return (
		<div>
			<SectionHeader
				title="All Challenges"
				titleProps={{
					variant: 'h2',
				}}
				padding={5}
			/>
			{data.length > 0 ? <ChallengesList data={data} /> : <p>No challenges</p>}
		</div>
	);
};
