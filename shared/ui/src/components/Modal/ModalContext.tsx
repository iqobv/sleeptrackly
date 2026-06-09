import { createContext, useContext } from 'react';
import { ModalContextType } from './Modal.types';

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error('useModalContext must be used within a Modal');
	}

	return context;
};
