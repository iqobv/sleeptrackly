'use client';

import { FieldValues, useController, useFormContext } from 'react-hook-form';
import Select from '../Select/Select';
import { SelectValue } from '../Select/Select.types';
import { FormSelectProps } from './FormSelect.types';
import FormSelectInput from './FormSelectInput';

const FormSelect = <T extends FieldValues>({
	children,
	control,
	name,
	className,
	customTrigger,
	displayFormat,
	multiple,
	placeholder,
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

	const formatValue = (currentValue: SelectValue | undefined): string => {
		if (displayFormat) {
			return displayFormat(currentValue);
		}

		if (!currentValue) {
			return '';
		}

		return Array.isArray(currentValue) ? currentValue.join(', ') : currentValue;
	};

	return (
		<Select
			value={value as string | string[] | undefined}
			onChange={onChange}
			multiple={multiple}
		>
			{customTrigger ? (
				customTrigger
			) : (
				<Select.Trigger asChild>
					{(currentValue, isOpen) => (
						<FormSelectInput
							currentValue={currentValue}
							isOpen={isOpen}
							placeholder={placeholder}
							formatValue={formatValue}
							className={className}
						/>
					)}
				</Select.Trigger>
			)}
			<Select.Content>{children}</Select.Content>
		</Select>
	);
};

export default FormSelect;
