'use client';

import { getAllProducts } from '@/api';
import { QUERY_KEYS } from '@/config';
import ItemsListPaginatedWrapper from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { ProductCard } from './ProductCard';
import { ProductsListLoader } from './ProductsListLoader';

type FullProduct = Awaited<ReturnType<typeof getAllProducts>>['items'][number];

export const ProductsList = () => {
	return (
		<ItemsListPaginatedWrapper<FullProduct>
			queryFn={(params) => getAllProducts(params)}
			queryKey={(params) => QUERY_KEYS.customization.product.list(params)}
			loader={<ProductsListLoader />}
			itemCard={(product) => <ProductCard key={product.id} product={product} />}
		/>
	);
};
