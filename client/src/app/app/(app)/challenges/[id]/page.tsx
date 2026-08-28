import { getServerChallengeById } from '@/api/challenge/getChallengeById.api';
import { Challenge } from '@/components/Challenges/Challenge/Challenge/Challenge';
import { QUERY_KEYS } from '@/config/queryClient.config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface ChallengePageProps {
	params: Promise<{ id: string }>;
}

const getCachedChallenge = cache(async (id: string) => {
	return await getServerChallengeById(id);
});

export async function generateMetadata({
	params,
}: ChallengePageProps): Promise<Metadata> {
	const { id } = await params;

	try {
		const challenge = await getCachedChallenge(id);

		return {
			title: challenge.translation.title || 'Challenge',
		};
	} catch {
		return {
			title: 'Challenge',
		};
	}
}

export default async function ChallengePage({ params }: ChallengePageProps) {
	const { id } = await params;

	try {
		const challenge = await getCachedChallenge(id);

		if (!challenge) notFound();

		const queryClient = new QueryClient();

		await queryClient
			.query({
				queryKey: QUERY_KEYS.challenges.detail(id),
				queryFn: () => getCachedChallenge(id),
			})
			.catch(() => {});

		return (
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Challenge id={id} />
			</HydrationBoundary>
		);
	} catch {
		notFound();
	}
}
