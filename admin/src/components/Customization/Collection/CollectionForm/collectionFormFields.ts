import { BaseCollectionDto } from '@/dto';
import type { Field } from '@/types';

export const COLLECTION_FORM_FIELDS: Field<BaseCollectionDto>[] = [
	{
		name: 'slug',
		label: 'Slug',
		placeholder: 'Enter collection slug',
		required: true,
		autoComplete: 'off',
	},
	{
		name: 'showInStore',
		label: 'Show in Store',
		type: 'checkbox',
		placeholder: '',
	},
	{
		name: 'accentColor',
		label: 'Accent Color',
		placeholder: 'Enter accent color (hex code)',
		type: 'color',
		autoComplete: 'off',
		required: true,
	},
];
