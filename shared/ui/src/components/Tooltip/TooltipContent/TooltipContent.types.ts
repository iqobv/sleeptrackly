import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export interface TooltipContentProps
	extends TooltipPrimitive.TooltipContentProps {
	children: React.ReactNode;
	showArrow?: boolean;
}
