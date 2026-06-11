'use client';

import { getAllItems } from '@/api';
import ItemCard from '@/components/Customization/ItemCard/ItemCard';
import ItemsListPaginatedWrapper from '@/components/Customization/ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { QUERY_KEYS } from '@/config';
import { Item } from '@/types';
import { Button } from '@shared/ui';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

const ProductItemsList = <T extends FieldValues>() => {
	const { setValue, watch } = useFormContext<T>();

	const itemId = watch('itemId' as Path<T>);

	const handleSelect = (id: string) => {
		setValue('productIdReward' as Path<T>, id as PathValue<T, Path<T>>);
	};

	return (
		<ItemsListPaginatedWrapper<Item>
			queryFn={(params) => getAllItems(params)}
			queryKey={(params) => QUERY_KEYS.customization.item.list(params)}
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
