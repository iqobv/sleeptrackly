'use client';

import { SectionHeader } from '@/components/UI';
import { Challenge } from '@/types';
import ChallengesList from '../ChallengesList/ChallengesList';

interface AllChallengesProps {
	data: Challenge[];
}

const AllChallenges = ({ data }: AllChallengesProps) => {
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

export default AllChallenges;
