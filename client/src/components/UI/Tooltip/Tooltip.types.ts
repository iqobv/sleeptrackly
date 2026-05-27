import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export interface TooltipProps extends TooltipPrimitive.TooltipProps {
	children: React.ReactNode;
}

export interface TooltipContextType {
	isOpen: boolean;
}
