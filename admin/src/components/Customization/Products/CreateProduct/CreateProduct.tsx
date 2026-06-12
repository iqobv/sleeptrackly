'use client';

import { createProduct } from '@/api/customization/product/product.api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { CreateProductDto } from '@/dto/customization/product.dto';
import { createProductSchema } from '@/schemas/customization/product/createProduct.schema';
import { Form } from '@shared/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ProductForm } from '../ProductForm/ProductForm';

export const CreateProduct = () => {
	const queryClient = useQueryClient();

	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: CreateProductDto) => createProduct(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.customization.product.lists,
			});
			router.push(PAGES.PRODUCT(data.id));
		},
		onError: (e) => toast.error(e.message || 'Something went wrong'),
	});

	return (
		<PageWrapper title="Create Product">
			<Form<CreateProductDto>
				schema={createProductSchema}
				onSubmit={(data) => mutate(data)}
				defaultValues={{
					isExclusive: false,
					isLimited: false,
					isNew: true,
					isShowInStore: true,
					bundleId: undefined,
					itemId: undefined,
					price: undefined,
					discountedPrice: undefined,
					maxStock: undefined,
					expiresAt: undefined,
				}}
			>
				<ProductForm isLoading={isPending} />
			</Form>
		</PageWrapper>
	);
};
