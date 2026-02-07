import { Profile } from '@/components/Profile';
import { IError } from '@/types';
import { notFound } from 'next/navigation';

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

	try {
		const res = await fetch(`${process.env.API_URL}/v1/profiles/${username}`);
		const data = await res.json();
		if (!res.ok) throw data;
	} catch (error: unknown) {
		const err = error as IError;
		if (err.statusCode === 404) {
			notFound();
		}
		throw err;
	}

	return (
		<div className="page">
			<Profile username={username} />
		</div>
	);
}
