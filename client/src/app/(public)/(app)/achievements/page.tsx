import { AchievementsList } from '@/components/Achievements';
import { SectionHeader } from '@/components/UI';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Achievement',
};

export default function AchievementPage() {
	return (
		<div className="page container">
			<SectionHeader title="Achievements" description="View All Achievements" />
			<AchievementsList />
		</div>
	);
}
