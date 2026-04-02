import { MobileDirection } from '@/components/Settings/SettingsField/SettingsField';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { IField } from '../ui/field.types';

export interface SettingsFormFields<T extends FieldValues> extends IField<T> {
	render?: (
		props: {
			methods: UseFormReturn<T>;
			error?: string;
		} & IField<T>,
	) => React.ReactNode;
	mobileDirection?: MobileDirection;
	accept?: string;
}
