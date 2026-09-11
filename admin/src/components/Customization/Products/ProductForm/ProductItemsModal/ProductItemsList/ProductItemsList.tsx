'use client';

import { getAllAvailableItems } from '@/api/customization/item/item.api';
import { ItemCard } from '@/components/Customization/ItemCard/ItemCard';
import { ItemsListPaginatedWrapper } from '@/components/Customization/ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Item } from '@/types/customization/item/item.types';
import { Button } from '@shared/ui';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

export const ProductItemsList = <T extends FieldValues>() => {
	const { setValue, watch } = useFormContext<T>();

	const itemId = watch('itemId' as Path<T>);

	const handleSelect = (id: string) => {
		setValue('itemId' as Path<T>, id as PathValue<T, Path<T>>);
		setValue('bundleId' as Path<T>, undefined as PathValue<T, Path<T>>);
	};

	return (
		<ItemsListPaginatedWrapper<Item>
			queryFn={({ language: _l, ...params }) => getAllAvailableItems(params)}
			queryKey={({ language: _l, ...params }) =>
				QUERY_KEYS.customization.item.listAvailable(params)
			}
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
