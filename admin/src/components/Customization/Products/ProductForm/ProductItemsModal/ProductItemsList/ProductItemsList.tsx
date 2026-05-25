'use client';

import { getAllAvailableItems } from '@/api';
import ItemCard from '@/components/Customization/ItemCard/ItemCard';
import ItemsListPaginatedWrapper from '@/components/Customization/ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { Button } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { PaginationDto } from '@/dto';
import { Item } from '@/types';
import { useSearchParams } from 'next/navigation';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

const ProductItemsList = <T extends FieldValues>() => {
	const searchParams = useSearchParams();
	const pageFromParams = Number(searchParams.get('page')) || 1;

	const params: PaginationDto = {
		page: pageFromParams,
		limit: 20,
	};

	const { setValue, watch } = useFormContext<T>();

	const itemId = watch('itemId' as Path<T>);

	const handleSelect = (id: string) => {
		setValue('itemId' as Path<T>, id as PathValue<T, Path<T>>);
		setValue('bundleId' as Path<T>, undefined as PathValue<T, Path<T>>);
	};

	return (
		<ItemsListPaginatedWrapper<Item>
			queryFn={() => getAllAvailableItems(params)}
			queryKey={() => [
				...QUERY_KEYS.customization.item.getAllAvailable(params),
			]}
			isModal
			itemCard={(item) => (
				<ItemCard
					item={item}
					actions={
						<Button
							variant="contained"
							color={itemId === item.id ? 'primary' : 'secondary'}
							fullWidth
							onClick={() => handleSelect(item.id)}
						>
							{itemId === item.id ? 'Selected' : 'Select'}
						</Button>
					}
				/>
			)}
		/>
	);
};

export default ProductItemsList;
