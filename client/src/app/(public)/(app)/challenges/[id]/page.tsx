import { Challenge } from '@/components/Challenges/Challenge/Challenge/Challenge';
import { SectionHeader } from '@shared/ui';
import { cookies } from 'next/headers';

interface ChallengePageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ChallengePageProps) {
	const { id } = await params;
	const cookiesStore = await cookies();
	const allCookies = cookiesStore.toString();

	const challenge = await fetch(`${process.env.API_URL}/v1/challenges/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			cookie: allCookies,
		},
	}).then((res) => res.json());

	return {
		title: challenge.title || 'Challenge',
	};
}

export default async function ChallengePage({ params }: ChallengePageProps) {
	const { id } = await params;

	return (
		<div className="container">
			<SectionHeader
				title="Challenge Details"
				description="View the details of your current challenge."
			/>
			<Challenge id={id} />
		</div>
	);
}
