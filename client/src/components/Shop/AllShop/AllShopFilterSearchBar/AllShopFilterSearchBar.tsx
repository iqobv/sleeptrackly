'use client';

import { ShopFilterDto } from '@/dto';
import { useFormContext, useWatch } from 'react-hook-form';

import { Field, FormSelect, Input, Select } from '@/components/UI';
import { ShopSortBy } from '@/types';
import { useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import styles from './AllShopFilterSearchBar.module.scss';
import { SHOP_FILTER_OPTIONS } from './filterSortOptions';

const AllShopFilterSearchBar = () => {
	const { register, watch, setValue, control } = useFormContext<
		ShopFilterDto & { sort?: string }
	>();

	const sort = watch('sort');

	const sortBy = useWatch({ control, name: 'sortBy' });
	const sortOrder = useWatch({ control, name: 'sortOrder' });

	useEffect(() => {
		if (!sortBy || !sortOrder) return;

		setValue('sort', `${sortBy}_${sortOrder}`.toUpperCase(), {
			shouldDirty: false,
		});
	}, [sortBy, sortOrder, setValue]);

	useEffect(() => {
		if (sort) {
			const [sortBy, sortOrder] = sort.split('_') as [
				ShopSortBy,
				'ASC' | 'DESC',
			];

			setValue('sortBy', sortBy, { shouldValidate: true, shouldDirty: true });
			setValue('sortOrder', sortOrder.toLowerCase() as 'asc' | 'desc', {
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
			<Field className={styles.selectContainer} label="Sort by:">
				<FormSelect
					name="sort"
					control={control}
					displayFormat={(value) => {
						const option = SHOP_FILTER_OPTIONS.find(
							(opt) => opt.value === value,
						);
						return option ? option.label : '';
					}}
					placeholder="Select filter type"
					className={styles.select}
				>
					{SHOP_FILTER_OPTIONS.map((option) => (
						<Select.Item key={option.value} value={option.value}>
							{option.label}
						</Select.Item>
					))}
				</FormSelect>
			</Field>
		</div>
	);
};

export default AllShopFilterSearchBar;
