import { createContext, useContext } from 'react';
import type { MultiSelectContextType } from './MultiSelect.types';

export const MultiSelectContext = createContext<MultiSelectContextType | null>(
	null,
);

export const useMultiSelectContext = () => {
	const context = useContext(MultiSelectContext);

	if (!context) {
		throw new Error('useMultiSelectContext must be used within a MultiSelect');
	}

	return context;
};
