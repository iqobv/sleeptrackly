'use client';

import { Checkbox, Field, FormSelect, Input, Select } from '@/components/UI';
import type { Field as FieldType } from '@/types';
import { FieldValues, useFormContext } from 'react-hook-form';

interface FormFieldsProps<T extends FieldValues> {
	fields: FieldType<T>[];
}

const FormFields = <T extends FieldValues>({ fields }: FormFieldsProps<T>) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<T>();

	return (
		<>
			{fields.map(({ name, label, type, options, placeholder }) => {
				const key = name;
				const pathName = name;
				const error = errors[pathName]?.message as string | undefined;

				if (type === 'checkbox') {
					return <Checkbox key={key} label={label} {...register(pathName)} />;
				}

				if (type === 'hidden') {
					return <input key={key} type="hidden" {...register(pathName)} />;
				}

				if (type === 'select') {
					return (
						<Field key={key} label={label} error={error}>
							<FormSelect
								name={pathName}
								control={control}
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
									<Select.Item key={option.value} value={option.value}>
										{option.label}
									</Select.Item>
								))}
							</FormSelect>
						</Field>
					);
				}

				return (
					<Field key={key} label={label} error={error}>
						<Input
							placeholder={placeholder}
							type={type}
							{...register(pathName, {
								...(type === 'number'
									? { setValueAs: (v) => (v === '' ? undefined : Number(v)) }
									: { setValueAs: (v) => (v === '' ? undefined : v) }),
							})}
						/>
					</Field>
				);
			})}
		</>
	);
};

export default FormFields;
