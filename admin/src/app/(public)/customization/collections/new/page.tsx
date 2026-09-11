import { CreateCollection } from '@/components/Customization/Collection/CreateCollection/CreateCollection';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'New Collection',
};

export default function NewCollectionPage() {
	return <CreateCollection />;
}
