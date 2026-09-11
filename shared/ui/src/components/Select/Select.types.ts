import * as SelectPrimitive from '@radix-ui/react-select';
import { Ref } from 'react';

export type WidthOption =
	| 'trigger'
	| 'fit-content'
	| 'max-content'
	| 'min-content'
	| 'auto'
	| number
	| (string & {});

export interface SelectProps extends SelectPrimitive.SelectProps {
	children: React.ReactNode;
}

export interface SelectTriggerProps extends Omit<
	SelectPrimitive.SelectTriggerProps,
	'ref'
> {
	placeholder?: string;
	ref?: Ref<HTMLButtonElement>;
}

export interface SelectItemProps extends Omit<
	SelectPrimitive.SelectItemProps,
	'ref'
> {
	children: React.ReactNode;
	ref?: Ref<HTMLDivElement>;
}

export interface SelectContentProps extends Omit<
	SelectPrimitive.SelectContentProps,
	'ref'
> {
	children: React.ReactNode;
	ref?: Ref<HTMLDivElement>;
	width?: WidthOption;
}
