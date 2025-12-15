import { CreateNotificationDto } from '@/dto';
import { IField } from '@/types';

export const FIELDS: IField<CreateNotificationDto>[] = [
	{
		name: 'title',
		label: 'Title',
		placeholder: 'Enter notification title',
		autocomplete: 'off',
		type: 'text',
	},
	{
		name: 'body',
		label: 'Body',
		placeholder: 'Enter notification body',
		autocomplete: 'off',
		type: 'text',
	},
	{
		name: 'redirectUrl',
		label: 'Redirect URL',
		placeholder: 'Enter redirect URL (optional)',
		autocomplete: 'off',
		type: 'text',
	},
	{
		name: 'isGlobal',
		label: 'Global Notification',
		placeholder: '',
		type: 'checkbox',
	},
	{
		name: 'showInApp',
		label: 'Show In-App',
		placeholder: '',
		type: 'checkbox',
	},
	{
		name: 'isEmail',
		label: 'Send as Email',
		placeholder: '',
		type: 'checkbox',
	},
];
