'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useState } from 'react';
import { TooltipProps } from './Tooltip.types';
import { TooltipContext } from './TooltipContext';

export const Tooltip = ({
	children,
	open,
	onOpenChange,
	delayDuration = 300,
	...props
}: TooltipProps) => {
	const [internalOpen, setInternalOpen] = useState(false);
	const isOpen = open !== undefined ? open : internalOpen;
	const setIsOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

	return (
		<TooltipPrimitive.Provider delayDuration={delayDuration}>
			<TooltipContext.Provider value={{ isOpen }}>
				<TooltipPrimitive.Root
					open={isOpen}
					onOpenChange={setIsOpen}
					{...props}
				>
					{children}
				</TooltipPrimitive.Root>
			</TooltipContext.Provider>
		</TooltipPrimitive.Provider>
	);
};

export const TooltipTrigger = TooltipPrimitive.Trigger;
