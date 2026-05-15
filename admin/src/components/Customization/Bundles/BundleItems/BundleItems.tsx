'use client';

import { getAllItems } from '@/api';
import { Button, Modal } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { Item } from '@/types';
import { useEffect, useState } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import ItemCard from '../../ItemCard/ItemCard';
import ItemsListPaginatedWrapper from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import ItemsListWrapper from '../../ItemsListWrapper/ItemsListWrapper';

interface BundleItemsProps {
	initialItems?: Item[];
}

const BundleItems = <T extends FieldValues>({
	initialItems,
}: BundleItemsProps) => {
	const [open, setOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState<Item[]>([]);

	const name = 'itemsIds' as Path<T>;

	const { setValue, watch } = useFormContext<T>();
	const selectedIds = (watch(name) as string[]) || [];

	useEffect(() => {
		if (initialItems && initialItems.length > 0) {
			setSelectedItems(initialItems);
			setValue(name, initialItems.map((i) => i.id) as PathValue<T, Path<T>>, {
				shouldDirty: false,
			});
		}
	}, [initialItems, setValue, name]);

	const toggleItem = (item: Item) => {
		const isSelected = selectedIds.includes(item.id);

		if (isSelected) {
			const newIds = selectedIds.filter((id) => id !== item.id);
			const newItems = selectedItems.filter((i) => i.id !== item.id);

			setSelectedItems(newItems);
			setValue(name, newIds as PathValue<T, Path<T>>, { shouldDirty: true });
		} else {
			const newIds = [...selectedIds, item.id];
			const newItems = [...selectedItems, item];

			setSelectedItems(newItems);
			setValue(name, newIds as PathValue<T, Path<T>>, { shouldDirty: true });
		}
	};

	const handleToggleModal = () => setOpen((prev) => !prev);

	return (
		<div>
			<Button onClick={handleToggleModal} type="button">
				Add Items
			</Button>

			{selectedItems.length > 0 && (
				<ItemsListWrapper
					items={selectedItems}
					itemCard={(item) => (
						<ItemCard
							key={item.id}
							item={item}
							actions={
								<Button
									fullWidth
									variant="outlined"
									onClick={() => toggleItem(item)}
									type="button"
								>
									Remove
								</Button>
							}
						/>
					)}
				/>
			)}

			<Modal isOpen={open} onClose={handleToggleModal}>
				<ItemsListPaginatedWrapper
					queryFn={getAllItems}
					queryKey={(query) => [...QUERY_KEYS.customization.item.getAll(query)]}
					itemCard={(item) => {
						const isSelected = selectedIds.includes(item.id);
						return (
							<ItemCard
								key={item.id}
								item={item}
								actions={
									<Button
										type="button"
										variant={isSelected ? 'outlined' : 'contained'}
										onClick={() => toggleItem(item)}
									>
										{isSelected ? 'Remove' : 'Add'}
									</Button>
								}
							/>
						);
					}}
				/>
			</Modal>
		</div>
	);
};

export default BundleItems;
