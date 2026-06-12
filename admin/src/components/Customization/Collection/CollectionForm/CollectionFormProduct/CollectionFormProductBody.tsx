'use client';

import { getAllProducts } from '@/api/customization/product/product.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { PaginationWithLanguageDto } from '@/dto/query/pagination.dto';
import { Product } from '@/types/customization/product/product.types';
import { ModalBody, Pagination } from '@shared/ui';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { SelectedProduct } from './CollectionFormProduct';
import styles from './CollectionFormProduct.module.scss';
import { CollectionFormProductGrid } from './CollectionFormProductGrid';

interface CollectionFormProductBodyProps {
	selectedProducts: SelectedProduct[];
	onToggleProduct: (product: Product) => void;
}

export const CollectionFormProductBody = ({
	onToggleProduct,
	selectedProducts,
}: CollectionFormProductBodyProps) => {
	const [page, setPage] = useState(1);

	const params: PaginationWithLanguageDto = useMemo(
		() => ({
			page,
			limit: 20,
			language: 'en',
		}),
		[page],
	);

	const { data } = useQuery({
		queryKey: QUERY_KEYS.customization.product.list(params),
		queryFn: () => getAllProducts(params),
		placeholderData: keepPreviousData,
	});

	return (
		<ModalBody className={styles.body}>
			{data && (
				<>
					<CollectionFormProductGrid
						products={data.items}
						onToggleProduct={onToggleProduct}
						selectedProducts={selectedProducts}
					/>
					<Pagination
						currentPage={page}
						onPageChange={setPage}
						totalPages={data.meta.totalPages}
					/>
				</>
			)}
		</ModalBody>
	);
};
