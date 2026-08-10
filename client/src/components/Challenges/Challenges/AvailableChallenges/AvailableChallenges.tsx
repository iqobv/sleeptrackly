'use client';

import { getAvailableChallenges } from '@/api/challenge/getAvaibleChallenges.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useCountdown } from '@/hooks/useCountdown.hook';
import { Grid, GridItem, pxToRem, SectionHeader, Typography } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { AvailableChallengeCard } from './AvailableChallengeCard/AvailableChallengeCard';
import { AvailableChallengesLoader } from './AvailableChallengesLoader';

export const AvailableChallenges = () => {
	const { formatted } = useCountdown();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.challenges.available(),
		queryFn: getAvailableChallenges,
	});

	return (
		<div>
			<SectionHeader
				title="Available Challenges"
				titleProps={{
					variant: 'h2',
				}}
				description="Explore and join new challenges to improve your sleep habits."
				padding={10}
				rightSlot={
					<Typography>Challenges refreshes at: {formatted}</Typography>
				}
			/>
			{isLoading && <AvailableChallengesLoader />}
			{!isLoading && data?.length === 0 && (
				<Typography align="center" style={{ marginTop: pxToRem(10) }}>
					No available challenges at the moment. Please check back later.
				</Typography>
			)}
			{data && data.length > 0 && (
				<Grid columns={2} stretchLastOdd>
					{data.map((challenge) => (
						<GridItem key={challenge.id}>
							<AvailableChallengeCard challenge={challenge} />
						</GridItem>
					))}
				</Grid>
			)}
		</div>
	);
};
