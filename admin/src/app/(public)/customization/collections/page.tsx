import { Collections } from '@/components/Customization/Collection/Collections/Collections';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Collections',
};

export default function CollectionsPage() {
	return <Collections />;
}
