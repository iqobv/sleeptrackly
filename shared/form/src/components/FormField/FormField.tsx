'use client';

import { Field } from '@shared/ui';
import clsx from 'clsx';
import React, { cloneElement, ReactElement } from 'react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import styles from './FormField.module.scss';
import { FormFieldProps } from './FormField.types';

export const FormField = <D extends FieldValues>({
	name,
	children,
	className,
	disabled,
	id,
	label,
	required,
	hidden,
	style,
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

	const isBooleanValue = typeof field.value === 'boolean';

	const controlledChild = cloneElement(
		children as ReactElement<Record<string, unknown>>,
		{
			...field,
			checked: isBooleanValue ? field.value : undefined,
			value: isBooleanValue ? undefined : (field.value ?? ''),
			...childProps,
			name,
			onChange: (...args: unknown[]) => {
				field.onChange(...args);
				if (customOnChange) customOnChange(...args);
			},
			onBlur: () => {
				field.onBlur();
				if (customOnBlur) customOnBlur();
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
			className={clsx(hidden && styles.hidden, className)}
			style={style}
		>
			{controlledChild}
		</Field>
	);
};
