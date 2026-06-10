import { UpdateItem } from '@/components/Customization/Items/UpdateItem/UpdateItem';

interface ItemPageProps {
	params: Promise<{ id: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
	const { id } = await params;

	return <UpdateItem id={id} />;
}
