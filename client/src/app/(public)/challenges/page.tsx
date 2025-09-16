import { Challenges } from '@/components/Challenges';
import { PageHeader } from '@/components/UI';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Challenges',
};

export default function ChallengesPage() {
	return (
		<div className="container page">
			<PageHeader
				title={'Challenges'}
				description={'Track and manage your personal challenges.'}
			/>
			<Challenges />
		</div>
	);
}
