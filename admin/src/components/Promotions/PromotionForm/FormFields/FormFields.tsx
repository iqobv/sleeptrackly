'use client';

import { Checkbox, Select, TextField } from '@/components/UI';
import { Field } from '@/types';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';

interface FormFieldsProps<T extends FieldValues> {
	fields: Field<T>[];
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
					<TextField
						key={key}
						label={label}
						placeholder={placeholder}
						type={type}
						error={error}
						{...register(pathName, {
							...(type === 'number'
								? { setValueAs: (v) => (v === '' ? undefined : Number(v)) }
								: { setValueAs: (v) => (v === '' ? undefined : v) }),
						})}
					/>
				);
			})}
		</>
	);
};

export default FormFields;
