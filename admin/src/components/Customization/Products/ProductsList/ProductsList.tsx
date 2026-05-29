'use client';

import { getAllProducts } from '@/api';
import { Grid, Pagination } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { usePagination } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { CustomizationPageHeader } from '../../CustomizationPageHeader';
import { ProductCard } from './ProductCard';
import styles from './ProductsList.module.scss';
import { ProductsListLoader } from './ProductsListLoader';

export const ProductsList = () => {
	const searchParams = useSearchParams();

	const pageFromUrl = Number(searchParams.get('page')) || 1;

	const params = {
		page: pageFromUrl,
		limit: 20,
		language: 'en',
	};

	const { data, isLoading } = useQuery({
		queryFn: () => getAllProducts(params),
		queryKey: QUERY_KEYS.customization.product.getAll(params),
	});

	const { currentPage, setPage } = usePagination(data?.meta.totalPages);

	return (
		<>
			<CustomizationPageHeader
				title="Products"
				href={PAGES.PRODUCT_NEW}
				buttonText="Add New Product"
			/>
			{isLoading && <ProductsListLoader />}
			{!isLoading && data?.items && data.items.length > 0 ? (
				<div className={styles.list}>
					<Grid
						columns="repeat(auto-fill, minmax(15.625rem, 1fr))"
						oneColumnOnMobile={false}
					>
						{data.items.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</Grid>
					<Pagination
						currentPage={currentPage}
						totalPages={data?.meta.totalPages}
						onPageChange={setPage}
					/>
				</div>
			) : (
				<div>No products found.</div>
			)}
		</>
	);
};
