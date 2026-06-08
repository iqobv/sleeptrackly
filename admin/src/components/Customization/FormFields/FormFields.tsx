'use client';

import { FormField, FormSelect } from '@/components/UI';
import type { Field as FieldType } from '@/types';
import { Checkbox, Input, SelectItem } from '@shared/ui';
import { FieldValues, useFormContext } from 'react-hook-form';

interface FormFieldsProps<T extends FieldValues> {
	fields: FieldType<T>[];
}

const FormFields = <T extends FieldValues>({ fields }: FormFieldsProps<T>) => {
	const {
		formState: { errors },
	} = useFormContext<T>();

	return (
		<>
			{fields.map(
				({
					name,
					label,
					type,
					options,
					placeholder,
					autoComplete,
					required,
				}) => {
					const error = errors[name]?.message as string | undefined;

					return (
						<FormField
							key={name}
							name={name}
							error={error}
							label={type !== 'checkbox' ? label : ''}
							hidden={type === 'hidden'}
							required={required}
							id={name}
						>
							{type === 'checkbox' ? (
								<Checkbox label={label} />
							) : type === 'hidden' ? (
								<input type="hidden" />
							) : type === 'select' ? (
								<FormSelect name={name} placeholder={placeholder} id={name}>
									{options?.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</FormSelect>
							) : (
								<Input
									placeholder={placeholder}
									type={type}
									id={name}
									autoComplete={autoComplete}
								/>
							)}
						</FormField>
					);
				},
			)}
		</>
	);
};

export default FormFields;
