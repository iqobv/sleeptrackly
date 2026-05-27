import { Achievements } from '@/components/Achievement';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Achievements',
};

export default function AchievementsPage() {
	return <Achievements />;
}
