'use client';

import { getAllProducts } from '@/api';
import ItemsListPaginatedWrapper from '@/components/Customization/ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { Button } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { CreatePromotionDto, PaginationWithLanguageDto } from '@/dto';
import { Product } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import ItemCard from './ItemCard/ItemCard';

const ProductsList = () => {
	const searchParams = useSearchParams();
	const pageFromParams = Number(searchParams.get('page')) || 1;

	const params: PaginationWithLanguageDto = {
		page: pageFromParams,
		limit: 20,
		language: 'en',
	};

	const { setValue, watch } = useFormContext<CreatePromotionDto>();

	const productId = watch('productIdReward');

	const handleSelect = (id: string) => {
		setValue('productIdReward', id);
	};

	return (
		<ItemsListPaginatedWrapper<Product>
			queryFn={() => getAllProducts(params)}
			queryKey={() => [...QUERY_KEYS.customization.product.getAll(params)]}
			itemCard={(product) => (
				<ItemCard
					product={product}
					actions={
						<Button
							variant={productId === product.id ? 'contained' : 'secondary'}
							fullWidth
							onClick={() => handleSelect(product.id)}
						>
							{productId === product.id ? 'Selected' : 'Select'}
						</Button>
					}
				/>
			)}
		/>
	);
};

export default ProductsList;
