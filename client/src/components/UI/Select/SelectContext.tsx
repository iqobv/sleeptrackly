'use client';

import { createContext, useContext } from 'react';
import { SelectContextType } from './Select.types';

export const SelectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
	const context = useContext(SelectContext);

	if (!context) {
		throw new Error('useSelectContext must be used within a Select');
	}

	return context;
};
