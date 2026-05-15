import { Field } from '@/types';
import { FieldValues, Path } from 'react-hook-form';
import { CREATE_ITEM_OPTIONS } from './CreateItemOptions';
import { CREATE_ITEM_RARITY_OPTIONS } from './CreateItemOptionsRarityOptions';

export const getItemsFields = <T extends FieldValues>(): Field<T>[] => [
	{
		name: 'basePrice' as Path<T>,
		label: 'Base Price',
		type: 'number',
		placeholder: 'Enter base price',
	},
	{
		name: 'isExclusive' as Path<T>,
		label: 'Exclusive',
		type: 'checkbox',
		placeholder: '',
	},
	{
		name: 'type' as Path<T>,
		label: 'Type',
		type: 'select',
		placeholder: 'Select item type',
		options: CREATE_ITEM_OPTIONS,
	},
	{
		name: 'rarity' as Path<T>,
		label: 'Rarity',
		type: 'select',
		placeholder: 'Select item rarity',
		options: CREATE_ITEM_RARITY_OPTIONS,
	},
];
