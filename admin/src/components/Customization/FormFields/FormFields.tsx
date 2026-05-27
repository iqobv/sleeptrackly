'use client';

import {
	Checkbox,
	FormField,
	FormSelect,
	Input,
	SelectItem,
} from '@/components/UI';
import type { Field as FieldType } from '@/types';
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
			{fields.map(({ name, label, type, options, placeholder }) => {
				const error = errors[name]?.message as string | undefined;

				return (
					<FormField
						key={name}
						name={name}
						error={error}
						label={type !== 'checkbox' ? label : ''}
						hidden={type === 'hidden'}
					>
						{type === 'checkbox' ? (
							<Checkbox label={label} />
						) : type === 'hidden' ? (
							<input type="hidden" />
						) : type === 'select' ? (
							<FormSelect
								name={name}
								displayFormat={(value) => {
									if (!value) return '';
									const selectedOptions = options?.filter((option) =>
										Array.isArray(value)
											? value.includes(option.value)
											: option.value === value,
									);
									return (
										selectedOptions?.map((option) => option.label).join(', ') ||
										''
									);
								}}
							>
								{options?.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</FormSelect>
						) : (
							<Input placeholder={placeholder} type={type} />
						)}
					</FormField>
				);
			})}
		</>
	);
};

export default FormFields;
