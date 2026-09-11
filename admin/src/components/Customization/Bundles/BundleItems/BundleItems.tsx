'use client';

import { getAllItems } from '@/api/customization/item/item.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Item } from '@/types/customization/item/item.types';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTrigger,
} from '@shared/ui';
import { useState } from 'react';
import {
	FieldValues,
	Path,
	PathValue,
	useFormContext,
	useWatch,
} from 'react-hook-form';
import { ItemCard } from '../../ItemCard/ItemCard';
import { ItemsListPaginatedWrapper } from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { ItemsListWrapper } from '../../ItemsListWrapper/ItemsListWrapper';
import styles from './BundleItems.module.scss';

interface BundleItemsProps {
	initialItems?: Item[];
}

export const BundleItems = <T extends FieldValues>({
	initialItems,
}: BundleItemsProps) => {
	const [selectedItems, setSelectedItems] = useState<Item[]>(() => {
		if (initialItems && initialItems.length > 0) {
			return initialItems;
		}
		return [];
	});

	const name = 'itemsIds' as Path<T>;
	const { setValue, control } = useFormContext<T>();

	const selectedIds =
		(useWatch({
			control,
			name,
		}) as string[]) || [];

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

	return (
		<>
			<Modal>
				<ModalTrigger asChild>
					<Button type="button">Add Items</Button>
				</ModalTrigger>
				<ModalContent className={styles.content}>
					<ModalHeader>Select Items</ModalHeader>
					<ModalBody>
						<ItemsListPaginatedWrapper
							queryFn={({ language: _l, ...params }) => getAllItems(params)}
							queryKey={({ language: _l, ...params }) =>
								QUERY_KEYS.customization.item.list(params)
							}
							isModal
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
					</ModalBody>
				</ModalContent>
			</Modal>
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
		</>
	);
};
