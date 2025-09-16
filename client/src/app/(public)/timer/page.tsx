import { Timer } from '@/components/Timer';
import { PageHeader } from '@/components/UI';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Timer',
};

export default function TimerPage() {
	return (
		<div className="container">
			<PageHeader title="Bedtime Timer" />
			<Timer />
		</div>
	);
}
