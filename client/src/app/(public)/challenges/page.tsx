import { Challenges } from '@/components/Challenges';
import { SectionHeader } from '@/components/UI';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Challenges',
};

export default function ChallengesPage() {
	return (
		<div className="container">
			<SectionHeader
				title={'Challenges'}
				description={'Track and manage your personal challenges.'}
			/>
			<Challenges />
		</div>
	);
}
