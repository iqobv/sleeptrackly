'use client';

import { getProductById, updateProduct } from '@/api';
import { Form } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { FormProductValues, UpdateProductDto } from '@/dto';
import { updateProductSchema } from '@/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
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

	const { mutate } = useMutation({
		mutationFn: (dto: UpdateProductDto) => updateProduct(id, dto),
		onSuccess: () => refetch(),
		onError: (e) => toast.error(e.message || 'Failed to update product'),
	});

	if (isLoading) return <div>Loading...</div>;

	return (
		<Form<FormProductValues, UpdateProductDto>
			schema={updateProductSchema}
			onSubmit={(data) => mutate(data)}
			defaultValues={{
				isExclusive: false,
				isLimited: false,
				isShowInStore: true,
				isNew: false,
				itemId: '',
				bundleId: '',
				price: 0,
				discountedPrice: undefined,
				maxStock: undefined,
				expiresAt: undefined,
			}}
			values={{
				isExclusive: data?.isExclusive || false,
				isLimited: data?.isLimited || false,
				isShowInStore: data?.isShowInStore ?? true,
				isNew: data?.isNew || false,
				itemId: data?.itemId || undefined,
				bundleId: data?.bundleId || undefined,
				price: data?.price,
				discountedPrice: data?.discountedPrice ?? undefined,
				maxStock: data?.maxStock ?? undefined,
				expiresAt: data?.expiresAt
					? new Date(data.expiresAt).toISOString().slice(0, 16)
					: undefined,
			}}
		>
			<ProductForm<UpdateProductDto>
				buttonLabel="Update Product"
				isEdit
				id={id}
			/>
		</Form>
	);
};

export default UpdateProduct;
