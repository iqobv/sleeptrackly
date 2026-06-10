'use client';

import type { Field } from '@/types';
import { FormField, FormSelect } from '@shared/form';
import { Checkbox, Input, SelectItem } from '@shared/ui';
import { FieldValues, useFormContext } from 'react-hook-form';

interface FormFieldsProps<T extends FieldValues> {
	fields: Field<T>[];
}

export const FormFields = <T extends FieldValues>({
	fields,
}: FormFieldsProps<T>) => {
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
					required,
					autoComplete,
				}) => {
					const key = name;
					const pathName = name;
					const error = errors[pathName]?.message as string | undefined;

					const renderComponent = () => {
						switch (type) {
							case 'checkbox':
								return <Checkbox key={key} label={label} />;
							case 'select':
								return (
									<FormSelect
										name={pathName}
										placeholder={placeholder}
										id={pathName}
									>
										{options?.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</FormSelect>
								);
							case 'hidden':
								return <input key={key} type="hidden" />;
							default:
								return (
									<Input
										placeholder={placeholder}
										type={type}
										id={pathName}
										autoComplete={autoComplete}
									/>
								);
						}
					};

					return (
						<FormField
							name={pathName}
							key={key}
							label={type !== 'checkbox' ? label : undefined}
							required={type !== 'checkbox' ? required : false}
							error={error}
							id={pathName}
							hidden={type === 'hidden'}
						>
							{renderComponent()}
						</FormField>
					);
				},
			)}
		</>
	);
};
