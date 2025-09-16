import { EditChallenge } from '@/components/Challenge';
import { PageHeader } from '@/components/UI';
import { cookies } from 'next/headers';

interface EditChallengePageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditChallengePageProps) {
	const { id } = await params;
	const cookiesStore = await cookies();
	const allCookies = cookiesStore.toString();

	const challenge = await fetch(`${process.env.API_URL}/v1/challenges/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			cookie: allCookies,
		},
	}).then((res) => res.json());

	return {
		title: `Edit ${challenge.title}` || 'Edit Challenge',
	};
}

export default async function EditChallengePage({
	params,
}: EditChallengePageProps) {
	const { id } = await params;

	return (
		<div className="container">
			<PageHeader title="Edit Challenge" />
			<EditChallenge id={id} />
		</div>
	);
}
