'use client';

import { ShopFilterDto } from '@/dto';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Select, TextField } from '@/components/UI';
import { Option, ShopSortBy } from '@/types';
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
		<div className={styles['search-bar']}>
			<TextField
				type="search"
				placeholder="Search products..."
				leftIcon={<MdSearch size={20} />}
				containerClassName={styles['search-input']}
				{...register('search')}
			/>
			<div className={styles['select-container']}>
				<label
					htmlFor="sort"
					className={styles['select-label']}
					onClick={() => document.getElementById('sort')?.focus()}
				>
					Sort by:
				</label>
				<Controller
					name="sort"
					control={control}
					render={({ field }) => (
						<Select
							options={SHOP_FILTER_OPTIONS as Option[]}
							isClearable={false}
							placeholder="Select filter type"
							containerClassName={styles['select']}
							id="sort"
							{...field}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default AllShopFilterSearchBar;
