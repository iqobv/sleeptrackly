'use client';

import { createProduct } from '@/api';
import { PAGES } from '@/config';
import { CreateProductDto } from '@/dto';
import { createProductSchema } from '@/schemas';
import { Form } from '@shared/form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ProductForm from '../ProductForm/ProductForm';

const CreateProduct = () => {
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: (data: CreateProductDto) => createProduct(data),
		onSuccess: (data) => router.push(PAGES.PRODUCT(data.id)),
		onError: (e) => toast.error(e.message || 'Something went wrong'),
	});

	return (
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
			<ProductForm<CreateProductDto> buttonLabel="Create Product" />
		</Form>
	);
};

export default CreateProduct;
