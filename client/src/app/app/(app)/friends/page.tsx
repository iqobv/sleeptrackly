import { Friends } from '@/components/Friends/Friends';
import { SectionHeader } from '@shared/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Friends',
};

export default function FriendsPage() {
	return (
		<>
			<SectionHeader title="Friends" />
			<Friends />
		</>
	);
}
