'use client';

import { SortOrder } from '@/types/api/sortOrder.types';
import { ShopSortBy } from '@/types/shop/shopSortBy.types';
import { FormSelect } from '@shared/form';
import { Field, Input, SelectItem } from '@shared/ui';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';
import { AllShopFiltersForm } from '../AllShop';
import styles from './AllShopFilterSearchBar.module.scss';
import { SHOP_FILTER_OPTIONS } from './filterSortOptions';

export const AllShopFilterSearchBar = () => {
	const { register, watch, setValue, control } =
		useFormContext<AllShopFiltersForm>();

	const sort = watch('sort');

	const sortBy = useWatch({ control, name: 'sortBy' });
	const sortOrder = useWatch({ control, name: 'sortOrder' });

	useEffect(() => {
		if (!sortBy || !sortOrder) return;

		setValue('sort', `${sortBy}_${sortOrder}`, {
			shouldDirty: false,
		});
	}, [sortBy, sortOrder, setValue]);

	useEffect(() => {
		if (sort) {
			const [sortBy, sortOrder] = sort.split('_') as [ShopSortBy, SortOrder];

			setValue('sortBy', sortBy, { shouldValidate: true, shouldDirty: true });
			setValue('sortOrder', sortOrder, {
				shouldValidate: true,
				shouldDirty: true,
			});
		}
	}, [sort, setValue]);

	return (
		<div className={styles.searchBar}>
			<Field>
				<Input
					type="search"
					placeholder="Search products..."
					leftSection={<MdSearch size={20} />}
					className={styles.input}
					{...register('search')}
				/>
			</Field>
			<Field className={styles.selectContainer} id="sortBy" label="Sort by:">
				<FormSelect
					name="sort"
					control={control}
					placeholder="Select filter type"
					className={styles.select}
					id="sortBy"
				>
					{SHOP_FILTER_OPTIONS.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</FormSelect>
			</Field>
		</div>
	);
};
