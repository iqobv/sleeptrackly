'use client';

import { SectionHeader } from '@/components/UI';
import { IChallenge } from '@/types';
import ChallengesList from '../ChallengesList/ChallengesList';

interface AllChallengesProps {
	data: IChallenge[];
}

const AllChallenges = ({ data }: AllChallengesProps) => {
	return (
		<div>
			<SectionHeader title="All Challenges" titleComponent="h2" padding={5} />
			{data.length > 0 ? <ChallengesList data={data} /> : <p>No challenges</p>}
		</div>
	);
};

export default AllChallenges;
