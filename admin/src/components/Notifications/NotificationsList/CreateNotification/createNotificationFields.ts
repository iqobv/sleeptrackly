import { CreateNotificationDto } from '@/dto';
import { Field } from '@/types';

export const FIELDS: Field<CreateNotificationDto>[] = [
	{
		name: 'title',
		label: 'Title',
		placeholder: 'Enter notification title',
		autoComplete: 'off',
		type: 'text',
		required: true,
	},
	{
		name: 'body',
		label: 'Body',
		placeholder: 'Enter notification body',
		autoComplete: 'off',
		type: 'text',
		required: true,
	},
	{
		name: 'type',
		label: 'Notification Type',
		placeholder: 'Select notification type',
		autoComplete: 'off',
		type: 'select',
		required: true,
	},
	{
		name: 'redirectUrl',
		label: 'Redirect URL',
		placeholder: 'Enter redirect URL (optional)',
		autoComplete: 'off',
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
