import { createContext, useContext } from 'react';
import { FieldContextValue } from './Field.types';

export const FieldContext = createContext<FieldContextValue | undefined>(
	undefined,
);

export const useField = ({
	id,
	disabled,
	error,
	required,
	hidden,
}: FieldContextValue): FieldContextValue => {
	const context = useContext(FieldContext);

	return {
		id: id ?? context?.id,
		disabled: disabled ?? context?.disabled,
		error: error ?? context?.error,
		required: required ?? context?.required,
		hidden: hidden ?? context?.hidden,
	};
};
