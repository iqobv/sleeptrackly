import { Challenges } from '@/components/Challenges/Challenges/Challenges';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Challenges',
};

export default function ChallengesPage() {
	return <Challenges />;
}
