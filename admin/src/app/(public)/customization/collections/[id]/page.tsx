import { EditCollection } from '@/components/Customization/Collection';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Edit Collection',
};

export default function CollectionPage() {
	return <EditCollection />;
}
