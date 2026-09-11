'use client';

import { Button } from '@shared/ui';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormResetProps } from './FormReset.types';

export const FormReset = ({
	children,
	buttonProps,
	disabledOnEmpty = false,
	onClick: injectedOnClick,
	ref,
	...props
}: FormResetProps) => {
	const {
		reset,
		formState: { isDirty },
	} = useFormContext();
	const { onClick: buttonPropsOnClick, ...rest } = buttonProps || {};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		reset();
		if (buttonPropsOnClick) {
			buttonPropsOnClick(e as React.MouseEvent<HTMLButtonElement>);
		}
		if (injectedOnClick) {
			injectedOnClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
		}
	};

	return (
		<Button
			type="button"
			onClick={handleClick}
			disabled={disabledOnEmpty && !isDirty}
			variant="outlined"
			ref={ref}
			{...rest}
			{...props}
		>
			{children}
		</Button>
	);
};
