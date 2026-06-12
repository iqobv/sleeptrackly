'use client';

import { getAllProducts } from '@/api/customization/product/product.api';
import { ItemsListPaginatedWrapper } from '@/components/Customization/ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { CreatePromotionDto } from '@/dto/promotion/promotion.dto';
import { Product } from '@/types/customization/product/product.types';
import { Button } from '@shared/ui';
import { useFormContext } from 'react-hook-form';
import { ItemCard } from './ItemCard/ItemCard';

export const ProductsList = () => {
	const { setValue, watch } = useFormContext<CreatePromotionDto>();

	const productId = watch('productIdReward');

	const handleSelect = (id: string) => {
		setValue('productIdReward', id);
	};

	return (
		<ItemsListPaginatedWrapper<Product>
			queryFn={(params) => getAllProducts(params)}
			queryKey={(params) => QUERY_KEYS.customization.product.list(params)}
			isModal
			itemCard={(product) => (
				<ItemCard
					product={product}
					actions={
						<Button
							variant="contained"
							color={productId === product.id ? 'primary' : 'secondary'}
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
