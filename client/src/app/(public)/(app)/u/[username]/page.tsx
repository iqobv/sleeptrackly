import { getServerProfile } from '@/api/profile/profile.api';
import { Profile } from '@/components/Profile/Profile';
import { QUERY_KEYS } from '@/config/queryClient.config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface ProfilePageProps {
	params: Promise<{ username: string }>;
}

const getCachedProfile = cache(
	async (username: string) => await getServerProfile(username),
);

export async function generateMetadata({ params }: ProfilePageProps) {
	const { username } = await params;

	return {
		title: username,
	};
}

export default async function ProfilePage({ params }: ProfilePageProps) {
	const { username } = await params;

	const queryClient = new QueryClient();

	try {
		const profile = await getCachedProfile(username);

		if (!profile) notFound();

		queryClient.prefetchQuery({
			queryKey: QUERY_KEYS.profile.username(username),
			queryFn: () => getCachedProfile(username),
		});
	} catch {
		notFound();
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="page">
				<Profile username={username} />
			</div>
		</HydrationBoundary>
	);
}
