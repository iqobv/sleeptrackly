import { PendingsList } from '@/components/Friends/PendingsList/PendingsList';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Pending Friends',
};

export default function FriendsPendingPage() {
	return (
		<Suspense fallback={null}>
			<PendingsList />
		</Suspense>
	);
}
