'use client';

import { Select, SelectContent, SelectTrigger } from '@shared/ui';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { FormSelectProps } from './FormSelect.types';

export const FormSelect = <T extends FieldValues>({
	control,
	name,
	children,
	placeholder,
	className = '',
	id,
}: FormSelectProps<T>) => {
	const formContext = useFormContext<T>();
	const resolvedControl = control || formContext?.control;

	if (!resolvedControl)
		throw new Error(
			'FormSelect requires either a control prop or to be nested within a FormProvider',
		);

	const {
		field: { value, onChange },
	} = useController({
		name,
		control: resolvedControl,
	});

	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger placeholder={placeholder} className={className} id={id} />
			<SelectContent>{children}</SelectContent>
		</Select>
	);
};
