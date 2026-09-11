import { CreateAchievement } from '@/components/Achievement/CreateAchievement/CreateAchievement';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'New Achievement',
};

export default function NewAchievementPage() {
	return <CreateAchievement />;
}
