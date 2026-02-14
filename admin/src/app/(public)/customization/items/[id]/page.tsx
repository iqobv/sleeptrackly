import { UpdateItem } from '@/components/Customization/Items';

interface ItemPageProps {
	params: Promise<{ id: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
	const { id } = await params;

	return (
		<div>
			<UpdateItem id={id} />
		</div>
	);
}
