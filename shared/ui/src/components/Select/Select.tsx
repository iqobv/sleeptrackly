'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { SelectProps } from './Select.types';

export const Select = ({ children, ...props }: SelectProps) => {
	return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
};
