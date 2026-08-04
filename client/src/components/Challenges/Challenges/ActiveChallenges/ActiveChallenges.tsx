'use client';

import { getUserActiveChallenges } from '@/api/challenge/getUserActiveChallenges.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Grid, GridItem, SectionHeader } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { ActiveChallengeCard } from './ActiveChallengeCard/ActiveChallengeCard';
import { ActiveChallengesGridLoader } from './ActiveChallengesLoader';

export const ActiveChallenges = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.challenges.active(),
		queryFn: getUserActiveChallenges,
	});

	return (
		<div>
			<SectionHeader
				title="Active Challenges"
				titleProps={{
					variant: 'h2',
				}}
				description="Track and manage your active challenges."
				padding={10}
			/>
			{isLoading && <ActiveChallengesGridLoader />}
			{data && data.length > 0 && (
				<Grid columns={2} stretchLastOdd>
					{data.map((userChallenge) => (
						<GridItem key={userChallenge.id}>
							<ActiveChallengeCard userChallenge={userChallenge} />
						</GridItem>
					))}
				</Grid>
			)}
		</div>
	);
};
