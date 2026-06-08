import { createContext, useContext } from 'react';
import { DropdownContextType } from './Dropdown.types';

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownContext = () => {
	const context = useContext(DropdownContext);

	if (!context) {
		throw new Error('useDropdownContext must be used within a Dropdown');
	}

	return context;
};
