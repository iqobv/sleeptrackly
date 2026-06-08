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
}: FieldContextValue): FieldContextValue => {
	const context = useContext(FieldContext);

	return {
		id: id ?? context?.id,
		disabled: disabled ?? context?.disabled,
		error: error ?? context?.error,
		required: required ?? context?.required,
	};
};
