'use client';

import { createProduct } from '@/api';
import { PAGES } from '@/config';
import { CreateProductDto } from '@/dto';
import { createProductSchema } from '@/schemas';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import CustomizationForm from '../../CustomizationForm/CustomizationForm';
import ProductForm from '../ProductForm/ProductForm';

const CreateProduct = () => {
	const router = useRouter();

	return (
		<CustomizationForm<CreateProductDto, Product>
			schema={createProductSchema}
			mutationFn={createProduct}
			onSuccess={(data) => {
				router.push(PAGES.PRODUCT(data.id));
			}}
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
		</CustomizationForm>
	);
};

export default CreateProduct;
