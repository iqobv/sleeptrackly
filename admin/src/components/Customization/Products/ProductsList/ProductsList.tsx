'use client';

import { getAllProducts } from '@/api';
import { PAGES, QUERY_KEYS } from '@/config';
import { CustomizationPageHeader } from '../../CustomizationPageHeader';
import ItemsListPaginatedWrapper from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { ProductCard } from './ProductCard';

type FullProduct = Awaited<ReturnType<typeof getAllProducts>>['items'][number];

export const ProductsList = () => {
	return (
		<>
			<CustomizationPageHeader
				title="Products"
				href={PAGES.PRODUCT_NEW}
				buttonText="Add New Product"
			/>
			<ItemsListPaginatedWrapper<FullProduct>
				queryFn={(params) => getAllProducts(params)}
				queryKey={(params) => [
					...QUERY_KEYS.customization.product.getAll(params),
				]}
				itemCard={(product) => (
					<ProductCard key={product.id} product={product} />
				)}
			/>
		</>
	);
};
