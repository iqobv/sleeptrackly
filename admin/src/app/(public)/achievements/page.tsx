import { Achievements } from '@/components/Achievement/Achievements/Achievements';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Achievements',
};

export default function AchievementsPage() {
	return <Achievements />;
}
