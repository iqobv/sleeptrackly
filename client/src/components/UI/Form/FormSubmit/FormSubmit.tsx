'use client';

import React, { ComponentPropsWithRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../../Button';
import { ButtonProps } from '../../Button/Button.types';

export type FormSubmitButtonProps = Omit<ButtonProps, 'type' | 'children'>;

export interface FormSubmitProps extends Omit<
	ComponentPropsWithRef<'button'>,
	'color'
> {
	buttonProps?: FormSubmitButtonProps;
	disabledOnEmpty?: boolean;
}

export const FormSubmit = ({
	children,
	buttonProps,
	disabledOnEmpty = false,
	onClick: injectedOnClick,
	ref,
	...props
}: FormSubmitProps) => {
	const {
		formState: { isDirty },
	} = useFormContext();

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (buttonProps?.onClick) {
			buttonProps.onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
		}
		if (injectedOnClick) {
			if (e.currentTarget instanceof HTMLButtonElement) {
				injectedOnClick(e as React.MouseEvent<HTMLButtonElement>);
			}
		}
	};

	return (
		<Button
			type="submit"
			{...buttonProps}
			disabled={disabledOnEmpty && !isDirty}
			onClick={handleClick}
			ref={ref}
			{...props}
		>
			{children}
		</Button>
	);
};
