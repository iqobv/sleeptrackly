import { Challenges } from '@/components/Challenges/Challenges/Challenges';
import { SectionHeader } from '@shared/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Challenges',
};

export default function ChallengesPage() {
	return (
		<div className="container">
			<SectionHeader
				title="Challenges"
				description="Track and manage your personal challenges."
			/>
			<Challenges />
		</div>
	);
}
