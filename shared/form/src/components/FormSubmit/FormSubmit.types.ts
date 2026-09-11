import { ButtonProps } from '@shared/ui';
import { ComponentPropsWithRef } from 'react';

export type FormSubmitButtonProps = Omit<ButtonProps, 'type' | 'children'>;

export interface FormSubmitProps extends Omit<
	ComponentPropsWithRef<'button'>,
	'color'
> {
	buttonProps?: FormSubmitButtonProps;
	disabledOnEmpty?: boolean;
}
