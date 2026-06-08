import { Timer } from '@/components/Timer';
import { SectionHeader } from '@shared/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Timer',
};

export default function TimerPage() {
	return (
		<div className="container">
			<SectionHeader title="Bedtime Timer" />
			<Timer />
		</div>
	);
}
