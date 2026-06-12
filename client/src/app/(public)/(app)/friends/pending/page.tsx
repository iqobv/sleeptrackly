import { PendingsList } from '@/components/Friends/PendingsList/PendingsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Pending Friends',
};

export default function FriendsPendingPage() {
	return (
		<div className="container page">
			<PendingsList />
		</div>
	);
}
