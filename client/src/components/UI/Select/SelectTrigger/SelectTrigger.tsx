'use client';

import * as Popover from '@radix-ui/react-popover';
import { SelectValue } from '../Select.types';
import { useSelectContext } from '../SelectContext';

interface SelectTriggerProps extends Omit<
	Popover.PopoverTriggerProps,
	'children'
> {
	children:
		| React.ReactNode
		| ((value: SelectValue | undefined, isOpen: boolean) => React.ReactNode);
}

export const SelectTrigger = ({
	children,
	asChild,
	...props
}: SelectTriggerProps) => {
	const { value, isOpen } = useSelectContext();

	const content =
		typeof children === 'function' ? children(value, isOpen) : children;

	return (
		<Popover.Trigger asChild={asChild} {...props}>
			{content}
		</Popover.Trigger>
	);
};
