import { CreateChallenge } from '@/components/Challenge';
import { SectionHeader } from '@/components/UI';

export default function NewChallengePage() {
	return (
		<div className="container">
			<SectionHeader title="New Challenge" />
			<CreateChallenge />
		</div>
	);
}
