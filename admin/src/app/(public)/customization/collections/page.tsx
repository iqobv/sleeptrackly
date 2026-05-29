import { Collections } from '@/components/Customization/Collection';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Collections',
};

export default function CollectionsPage() {
	return <Collections />;
}
