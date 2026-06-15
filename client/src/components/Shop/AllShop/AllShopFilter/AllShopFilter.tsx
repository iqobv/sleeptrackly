'use client';

import { getShopFilters } from '@/api/shop/getShopFilters.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { ShopFilterDto } from '@/dto/shop/shop.dto';
import { Button, Checkbox, Input, Typography } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { DEFAULT_SHOP_FILTER_VALUES } from '../shopFilterValues';
import { useShopFilters } from '../useShopFilters.hook';
import styles from './AllShopFilter.module.scss';
import { shopItemTypeOptions, shopProductTypeOptions } from './filterOptions';

const setValueAs = (v: unknown) =>
	v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v);

export const AllShopFilter = () => {
	const { register, reset } = useFormContext<ShopFilterDto>();

	const [, setUrlFilters] = useShopFilters();

	const { data } = useQuery({
		queryKey: QUERY_KEYS.shop.filters,
		queryFn: () => getShopFilters({ language: 'en' }),
	});

	const handleReset = () => {
		reset(DEFAULT_SHOP_FILTER_VALUES);

		setUrlFilters({
			type: null,
			itemType: null,
			search: null,
			collection: null,
			sortBy: null,
			sortOrder: null,
			page: 1,
			minPrice: 0,
			maxPrice: null,
		});
	};

	return (
		<div className={styles.filter}>
			<div className={styles.option}>
				<Typography variant="subtitle1">Price Range</Typography>
				<div className={styles.priceRange}>
					<Input
						placeholder="Min Price"
						type="number"
						className={styles.priceInput}
						{...register('minPrice', {
							setValueAs: (v) => setValueAs(v),
						})}
					/>
					<Input
						placeholder="Max Price"
						type="number"
						className={styles.priceInput}
						{...register('maxPrice', {
							setValueAs: (v) => setValueAs(v),
						})}
					/>
				</div>
			</div>
			<div className={styles.option}>
				{shopProductTypeOptions.map((productType) => (
					<div key={productType.value}>
						<input
							type="radio"
							id={`productType_${productType.value}`}
							value={productType.value}
							className={styles.radio}
							{...register('type')}
						/>
						<label htmlFor={`productType_${productType.value}`}>
							{productType.label}
						</label>
					</div>
				))}
			</div>
			<div className={styles.option}>
				{shopItemTypeOptions.map((itemType) => (
					<div key={itemType.value}>
						<Checkbox
							label={itemType.label}
							value={itemType.value}
							id={`itemType_${itemType.value}`}
							{...register('itemType')}
						/>
					</div>
				))}
			</div>
			{data?.collections && (
				<div className={styles.option}>
					<Typography variant="subtitle1">Collections</Typography>
					<div className={styles.option}>
						{data.collections.map((collection) => (
							<div key={collection.slug}>
								<Checkbox
									label={collection.name}
									value={collection.slug}
									id={`collection_${collection.slug}`}
									{...register('collection')}
								/>
							</div>
						))}
					</div>
				</div>
			)}
			<Button type="button" onClick={handleReset}>
				Reset Filters
			</Button>
		</div>
	);
};
