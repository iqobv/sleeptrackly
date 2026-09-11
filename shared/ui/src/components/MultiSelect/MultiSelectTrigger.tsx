'use client';

import * as Popover from '@radix-ui/react-popover';
import { useMultiSelectContext } from './MultiSelectContext';

interface MultiSelectTriggerProps extends Omit<
	Popover.PopoverTriggerProps,
	'children'
> {
	children:
		| React.ReactNode
		| ((value: string[], isOpen: boolean) => React.ReactNode);
}

export const MultiSelectTrigger = ({
	children,
	asChild,
	...props
}: MultiSelectTriggerProps) => {
	const { value, isOpen, triggerRef } = useMultiSelectContext();

	const content =
		typeof children === 'function' ? children(value, isOpen) : children;

	return (
		<Popover.Trigger asChild={asChild} ref={triggerRef} {...props}>
			{content}
		</Popover.Trigger>
	);
};
