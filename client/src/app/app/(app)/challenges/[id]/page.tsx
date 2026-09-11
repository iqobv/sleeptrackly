import { Challenge } from '@/components/Challenges/Challenge/Challenge/Challenge';
import { Metadata } from 'next';

interface ChallengePageProps {
	params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
	title: 'Challenge',
};

export default async function ChallengePage({ params }: ChallengePageProps) {
	const { id } = await params;

	return <Challenge id={id} />;
}
