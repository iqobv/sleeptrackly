import UpdateProduct from '@/components/Customization/Products/UpdateProduct/UpdateProduct';

interface ProductPageProps {
	params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;

	return (
		<div>
			<UpdateProduct id={id} />
		</div>
	);
}
