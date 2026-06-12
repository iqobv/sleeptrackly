'use client';

import {
	deleteProduct,
	getProductById,
	updateProduct,
} from '@/api/customization/product/product.api';
import { DeleteButton, PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import {
	FormProductValues,
	UpdateProductDto,
} from '@/dto/customization/product.dto';
import { updateProductSchema } from '@/schemas/customization/product/updateProduct.schema';
import { Form } from '@shared/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ProductForm } from '../ProductForm/ProductForm';

interface UpdateProductProps {
	id: string;
}

export const UpdateProduct = ({ id }: UpdateProductProps) => {
	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryFn: () => getProductById(id),
		queryKey: QUERY_KEYS.customization.product.detail(id),
		enabled: !!id,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (dto: UpdateProductDto) => updateProduct(id, dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.customization.product.detail(id),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.customization.product.lists,
			});
		},
		onError: (e) => toast.error(e.message || 'Failed to update product'),
	});

	return (
		<PageWrapper
			title="Update Product"
			customRightSlot={
				<DeleteButton
					id={id}
					mutationFn={deleteProduct}
					onSuccessNavigateTo={PAGES.PRODUCTS}
					queryInvalidateKey={QUERY_KEYS.customization.product.all}
					title="Delete Product"
					text="Are you sure you want to delete this product? This action cannot be undone."
				/>
			}
		>
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
				<ProductForm isEdit isLoading={isPending} />
			</Form>
		</PageWrapper>
	);
};
