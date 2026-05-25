'use client';

import React, { cloneElement, ReactElement } from 'react';
import {
	FieldValues,
	Path,
	useController,
	useFormContext,
} from 'react-hook-form';
import Field from '../../Field/Field';
import { FieldProps } from '../../Field/Field.types';

export interface FormFieldProps<D extends FieldValues> extends Omit<
	FieldProps,
	'children'
> {
	name: Path<D>;
	children: ReactElement;
}

const FormField = <D extends FieldValues>({
	name,
	children,
	className,
	disabled,
	id,
	label,
	required,
}: FormFieldProps<D>) => {
	const { control } = useFormContext<D>();
	const {
		field,
		fieldState: { error },
	} = useController<D>({ name, control, disabled });

	if (!React.isValidElement(children)) {
		throw new Error(
			'FormField requires a single valid React element as a child.',
		);
	}

	const childProps = children.props as Record<string, unknown>;
	const customOnChange = childProps.onChange as
		| ((...args: unknown[]) => void)
		| undefined;
	const customOnBlur = childProps.onBlur as (() => void) | undefined;

	const controlledChild = cloneElement(
		children as ReactElement<Record<string, unknown>>,
		{
			...field,
			...childProps,
			name,
			onChange: (...args: unknown[]) => {
				field.onChange(...args);
				if (customOnChange) {
					customOnChange(...args);
				}
			},
			onBlur: () => {
				field.onBlur();
				if (customOnBlur) {
					customOnBlur();
				}
			},
		} as Record<string, unknown>,
	);

	return (
		<Field
			label={label}
			error={error?.message?.toString()}
			required={required}
			disabled={disabled}
			id={id}
			className={className}
		>
			{controlledChild}
		</Field>
	);
};

export default FormField;
