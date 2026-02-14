'use client';

import { getAllAvailableItems } from '@/api';
import ItemCard from '@/components/Customization/ItemCard/ItemCard';
import { Button, Pagination } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { PaginationDto } from '@/dto';
import { usePagination } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import styles from './ProductItemsList.module.scss';

const ProductItemsList = <T extends FieldValues>() => {
	const searchParams = useSearchParams();
	const pageFromParams = Number(searchParams.get('page')) || 1;

	const params: PaginationDto = {
		page: pageFromParams,
		limit: 20,
	};

	const { data } = useQuery({
		queryFn: () => getAllAvailableItems(params),
		queryKey: QUERY_KEYS.customization.product.getAllAvailable(params),
	});

	const { setValue, watch } = useFormContext<T>();

	const { currentPage, setPage } = usePagination(data?.meta.totalPages);

	const itemId = watch('itemId' as Path<T>);

	const handleSelect = (id: string) => {
		setValue('itemId' as Path<T>, id as PathValue<T, Path<T>>);
		setValue('bundleId' as Path<T>, undefined as PathValue<T, Path<T>>);
	};

	return (
		<div>
			{data && data.items.length > 0 ? (
				<div className={styles['product-items-list']}>
					{data.items.map((item) => (
						<ItemCard
							key={item.id}
							item={item}
							actions={
								<Button
									variant={itemId === item.id ? 'contained' : 'secondary'}
									fullWidth
									onClick={() => handleSelect(item.id)}
								>
									{itemId === item.id ? 'Selected' : 'Select'}
								</Button>
							}
						/>
					))}
					<Pagination
						currentPage={currentPage}
						onPageChange={setPage}
						totalPages={data.meta.totalPages}
					/>
				</div>
			) : (
				<div>No Available Items</div>
			)}
		</div>
	);
};

export default ProductItemsList;
