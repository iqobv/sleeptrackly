'use client';

import { createContext, useContext } from 'react';
import { TooltipContextType } from './Tooltip.types';

export const TooltipContext = createContext<TooltipContextType | null>(null);

export const useTooltipContext = () => {
	const context = useContext(TooltipContext);

	if (!context) {
		throw new Error('useTooltipContext must be used within a Tooltip');
	}

	return context;
};
