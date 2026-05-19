'use client';

import { Checkbox, Field, Input, Select } from '@/components/UI';
import type { Field as FieldType } from '@/types';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';

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
						<Controller
							key={name}
							control={control}
							name={pathName}
							render={({ field }) => (
								<Select
									label={label}
									options={options || []}
									{...field}
									value={String(field.value) || undefined}
								/>
							)}
						/>
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
