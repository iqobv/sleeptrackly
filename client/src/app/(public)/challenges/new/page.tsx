import { CreateChallenge } from '@/components/Challenge';
import { PageHeader } from '@/components/UI';

export default function NewChallengePage() {
	return (
		<div className="container">
			<PageHeader title="New Challenge" />
			<CreateChallenge />
		</div>
	);
}
