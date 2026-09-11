import { CreateItem } from '@/components/Customization/Items/CreateItem/CreateItem';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'New Item',
}

export default function NewItemPage() {
	return <CreateItem />;
}
