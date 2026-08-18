'use client';

import { getAllChallenges } from '@/api/challenge/getAllChallenges.api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { challengesQuerySchema } from '@/schemas/challenge/challengesQuery.schema';
import { Typography } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ChallengesTable } from './ChallengesTable/ChallengesTable';
import { ChallengesTableFilters } from './ChallengesTable/ChallengesTableFilters';
import { ChallengesTableLoader } from './ChallengesTable/ChallengesTableLoader';
import { useChallengeFilters } from './useChallengeFilters.hook';

export const Challenges = () => {
	const [filters] = useChallengeFilters();

	const validatedParams = useMemo(
		() => challengesQuerySchema.parse(filters),
		[filters],
	);

	const { data, isLoading, isFetched } = useQuery({
		queryKey: QUERY_KEYS.challenge.list(validatedParams),
		queryFn: () => getAllChallenges(validatedParams),
	});

	return (
		<PageWrapper
			title="Challenges"
			description="Manage challenges. Creaete, edit, and delete to customize challenges for users."
			showBackButton={false}
			buttonText="Create Challenge"
			href={PAGES.CHALLENGE_NEW}
		>
			<ChallengesTableFilters />
			{isLoading && <ChallengesTableLoader />}
			{data && data.meta.total > 0 && (
				<ChallengesTable
					challenges={data.items}
					totalPages={data.meta.totalPages}
				/>
			)}
			{isFetched && data?.meta.total === 0 && (
				<Typography style={{ textAlign: 'center', marginTop: '2rem' }}>
					No challenges found. Please create a new challenge or change filtes.
				</Typography>
			)}
		</PageWrapper>
	);
};
