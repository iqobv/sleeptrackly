import { ComponentPropsWithRef } from 'react';
import { FormSubmitButtonProps } from '../FormSubmit/FormSubmit.types';

export interface FormResetProps extends Omit<
	ComponentPropsWithRef<'button'>,
	'color'
> {
	buttonProps?: FormSubmitButtonProps;
	disabledOnEmpty?: boolean;
}
