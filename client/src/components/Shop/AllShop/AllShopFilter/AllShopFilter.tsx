'use client';

import { Button } from '@/components/UI';
import Checkbox from '@/components/UI/Checkbox/Checkbox';
import { ShopFilterDto } from '@/dto';
import { useFormContext } from 'react-hook-form';
import { DEFAULT_SHOP_FILTER_VALUES } from '../shopFilterValues';
import { useShopFilters } from '../useShopFilters.hook';
import styles from './AllShopFilter.module.scss';
import { shopItemTypeOptions, shopProductTypeOptions } from './filterOptions';

export const AllShopFilter = () => {
	const { register, reset } = useFormContext<ShopFilterDto>();

	const [, setUrlFilters] = useShopFilters();

	const handleReset = () => {
		reset(DEFAULT_SHOP_FILTER_VALUES);

		setUrlFilters({
			type: null,
			itemType: null,
			search: null,
			sortBy: null,
			sortOrder: null,
			page: 1,
		});
	};

	return (
		<div className={styles.filter}>
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
			<Button type="button" onClick={handleReset}>
				Reset Filters
			</Button>
		</div>
	);
};
