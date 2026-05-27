import { CreateAchievement } from '@/components/Achievement';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'New Achievement',
};

export default function NewAchievementPage() {
	return <CreateAchievement />;
}
