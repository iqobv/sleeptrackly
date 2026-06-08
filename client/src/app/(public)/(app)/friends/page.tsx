import { Friends } from '@/components/Friends';
import { SectionHeader } from '@shared/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Friends',
};

export default function FriendsPage() {
	return (
		<div className="container page">
			<SectionHeader title="Friends" />
			<Friends />
		</div>
	);
}
