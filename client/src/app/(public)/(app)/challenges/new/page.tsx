import { CreateChallenge } from '@/components/Challenge/CreateChallenge/CreateChallenge';
import { SectionHeader } from '@shared/ui';

export default function NewChallengePage() {
	return (
		<div className="container">
			<SectionHeader title="New Challenge" />
			<CreateChallenge />
		</div>
	);
}
