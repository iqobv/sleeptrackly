import { Profile } from '@/components/Profile/Profile';

interface ProfilePageProps {
	params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
	const { username } = await params;

	return {
		title: username,
	};
}

export default async function ProfilePage({ params }: ProfilePageProps) {
	const { username } = await params;

	return <Profile username={username} />;
}
