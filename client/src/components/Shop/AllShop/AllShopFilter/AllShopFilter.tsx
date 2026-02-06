'use client';

import { Button } from '@/components/UI';
import { ShopFilterDto } from '@/dto';
import { useFormContext } from 'react-hook-form';
import { DEFAULT_SHOP_FILTER_VALUES } from '../shopFilterValues';
import styles from './AllShopFilter.module.scss';
import { shopItemTypeOptions, shopProductTypeOptions } from './filterOptions';

const AllShopFilter = () => {
	const { register, reset } = useFormContext<ShopFilterDto>();

	const handleReset = () => reset(DEFAULT_SHOP_FILTER_VALUES);

	return (
		<div className={styles['filter']}>
			<div className={styles['filter__option']}>
				{shopProductTypeOptions.map((productType) => (
					<div key={productType.value} className={styles['filter__item']}>
						<input
							type="radio"
							id={`productType_${productType.value}`}
							value={productType.value}
							className={styles['radio']}
							{...register('type')}
						/>
						<label htmlFor={`productType_${productType.value}`}>
							{productType.label}
						</label>
					</div>
				))}
			</div>
			<div className={styles['filter__option']}>
				{shopItemTypeOptions.map((itemType) => (
					<div key={itemType.value} className={styles['filter__item']}>
						<input
							type="checkbox"
							id={`itemType_${itemType.value}`}
							value={itemType.value}
							className={styles['checkbox']}
							{...register('itemType')}
						/>
						<label htmlFor={`itemType_${itemType.value}`}>
							{itemType.label}
						</label>
					</div>
				))}
			</div>
			<Button type="button" onClick={handleReset}>
				Reset Filters
			</Button>
		</div>
	);
};

export default AllShopFilter;
