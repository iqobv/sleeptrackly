'use client';

import { getAllProducts } from '@/api';
import { Button, Pagination } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { usePagination } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard/ProductCard';

import styles from './ProductsList.module.scss';

const ProductsList = () => {
	const searchParams = useSearchParams();

	const pageFromUrl = Number(searchParams.get('page')) || 1;

	const params = {
		page: pageFromUrl,
		limit: 20,
		language: 'en',
	};

	const { data } = useQuery({
		queryFn: () => getAllProducts(params),
		queryKey: QUERY_KEYS.customization.product.getAll(params),
	});

	const { currentPage, setPage } = usePagination(data?.meta.totalPages);

	return (
		<div>
			<Button href={PAGES.PRODUCT_NEW}>Add Product</Button>
			{data?.items && data.items.length > 0 ? (
				<div className={styles['products-list']}>
					{data.items.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
					<Pagination
						currentPage={currentPage}
						totalPages={data?.meta.totalPages}
						onPageChange={setPage}
					/>
				</div>
			) : (
				<div>No products found.</div>
			)}
		</div>
	);
};

export default ProductsList;
