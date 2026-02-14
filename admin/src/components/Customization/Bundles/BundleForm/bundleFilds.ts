import { IField } from '@/types';
import { FieldValues, Path } from 'react-hook-form';

export const getBundleFields = <T extends FieldValues>(): IField<T>[] => [
	{
		name: 'isExclusive' as Path<T>,
		placeholder: 'Is Exclusive',
		label: 'Exclusive',
		type: 'checkbox',
	},
	{
		name: 'discountPercentage' as Path<T>,
		placeholder: 'Discount Percentage',
		label: 'Discount Percentage',
		type: 'number',
	},
];
