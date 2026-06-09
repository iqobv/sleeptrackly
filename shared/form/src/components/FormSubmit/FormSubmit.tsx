'use client';

import { Button } from '@shared/ui';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormSubmitProps } from './FormSubmit.types';

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
