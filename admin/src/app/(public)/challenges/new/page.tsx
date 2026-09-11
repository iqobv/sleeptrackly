import { CreateChallenge } from '@/components/Challenge/All/CreateChallenge/CreateChallenge';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create Challenge',
};

export default function Page() {
	return <CreateChallenge />;
}
