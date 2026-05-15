'use client';

import { getProductById, updateProduct } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateProductDto } from '@/dto';
import { updateProductSchema } from '@/schemas';
import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import CustomizationForm from '../../CustomizationForm/CustomizationForm';
import ProductForm from '../ProductForm/ProductForm';

interface UpdateProductProps {
	id: string;
}

const UpdateProduct = ({ id }: UpdateProductProps) => {
	const { data, refetch, isLoading } = useQuery({
		queryFn: () => getProductById(id),
		queryKey: QUERY_KEYS.customization.product.getById(id),
		enabled: !!id,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<CustomizationForm<UpdateProductDto, Product>
			schema={updateProductSchema}
			mutationFn={(dto) => updateProduct(id, dto)}
			onSuccess={() => {
				refetch();
			}}
			defaultValues={{
				...data,
				itemId: data?.itemId || '',
				bundleId: data?.bundleId || '',
				price: data?.price ?? undefined,
				discountedPrice: data?.discountedPrice ?? undefined,
				maxStock: data?.maxStock ?? undefined,
				expiresAt: data?.expiresAt
					? new Date(data.expiresAt).toISOString().slice(0, 16)
					: '',
			}}
		>
			<ProductForm<UpdateProductDto>
				buttonLabel="Update Product"
				isEdit
				id={id}
			/>
		</CustomizationForm>
	);
};

export default UpdateProduct;
