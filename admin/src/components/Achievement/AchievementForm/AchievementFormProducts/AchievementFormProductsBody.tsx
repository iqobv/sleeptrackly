'use client';

import { getAllProducts } from '@/api';
import ItemsListPaginatedWrapper from '@/components/Customization/ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import ItemCard from '@/components/Promotions/SelectProduct/ProductItemsModal/ProductsList/ItemCard/ItemCard';
import { QUERY_KEYS } from '@/config';
import { Product } from '@/types';
import { Button, ModalBody } from '@shared/ui';
import { Dispatch, SetStateAction } from 'react';

interface AchievementFormProductsBodyProps {
	selectedProduct: Product | null;
	setSelectedProduct: Dispatch<SetStateAction<Product | null>>;
}

export const AchievementFormProductsBody = ({
	selectedProduct,
	setSelectedProduct,
}: AchievementFormProductsBodyProps) => {
	const handleSelect = (product: Product) => {
		if (selectedProduct?.id === product.id) {
			setSelectedProduct(null);
		} else {
			setSelectedProduct(product);
		}
	};

	const productId = selectedProduct?.id;

	return (
		<ModalBody>
			<ItemsListPaginatedWrapper<Product>
				queryFn={() => getAllProducts({ limit: 20, page: 1, language: 'en' })}
				queryKey={() => [
					...QUERY_KEYS.customization.product.getAll({
						limit: 20,
						page: 1,
						language: 'en',
					}),
				]}
				isModal
				itemCard={(product) => (
					<ItemCard
						product={product}
						actions={
							<Button
								variant="contained"
								color={productId === product.id ? 'primary' : 'secondary'}
								fullWidth
								onClick={() => handleSelect(product)}
							>
								{productId === product.id ? 'Selected' : 'Select'}
							</Button>
						}
					/>
				)}
			/>
		</ModalBody>
	);
};
