'use client';

import { FormSelect } from '@/components/UI';
import type { Field as FieldType } from '@/types';
import { Checkbox, Field, Input, SelectItem } from '@shared/ui';
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
								placeholder={placeholder}
								id={pathName}
							>
								{options?.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</FormSelect>
						</Field>
					);
				}

				return (
					<Field key={key} label={label} error={error} id={pathName}>
						<Input
							placeholder={placeholder}
							type={type}
							id={pathName}
							{...register(pathName, {
								setValueAs: (v) =>
									v === '' ? undefined : type === 'number' ? Number(v) : v,
							})}
						/>
					</Field>
				);
			})}
		</>
	);
};

export default FormFields;
