import { Field } from '@/types';
import { FieldValues, Path } from 'react-hook-form';

export const getProductsFields = <T extends FieldValues>(): Field<T>[] => [
	{
		name: 'itemId' as Path<T>,
		label: 'Item Id',
		placeholder: 'Item',
		type: 'hidden',
	},
	{
		name: 'bundleId' as Path<T>,
		label: 'Bundle Id',
		placeholder: 'Bundle',
		type: 'hidden',
	},
	{
		name: 'isNew' as Path<T>,
		label: 'Is New',
		placeholder: 'New',
		type: 'checkbox',
	},
	{
		name: 'isShowInStore' as Path<T>,
		label: 'Show In Store',
		placeholder: 'Show In Store',
		type: 'checkbox',
	},
	{
		name: 'isExclusive' as Path<T>,
		label: 'Exclusive',
		placeholder: 'Exclusive',
		type: 'checkbox',
	},

	{
		name: 'isLimited' as Path<T>,
		label: 'Limited',
		placeholder: 'Limited',
		type: 'checkbox',
	},
	{
		name: 'price' as Path<T>,
		label: 'Enter Price (leave emptry to inherit from item or bundle)',
		placeholder: 'Price',
		type: 'number',
	},
	{
		name: 'discountedPrice' as Path<T>,
		label: 'Enter Discounted Price (leave emptry to not make discount)',
		placeholder: 'Discounted Price',
		type: 'number',
	},
	{
		name: 'maxStock' as Path<T>,
		label: 'Enter Max Stock (leave emptry to remove stock limit)',
		placeholder: 'Max Stock',
		type: 'number',
	},
	{
		name: 'expiresAt' as Path<T>,
		label: 'Expires At',
		placeholder: 'Expires At',
		type: 'datetime-local',
	},
];
