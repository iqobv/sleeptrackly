import { CSSProperties, ReactNode } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormSelectProps<T extends FieldValues> {
	name: Path<T>;
	control?: Control<T>;
	children: ReactNode;
	placeholder?: string;
	className?: string;
	id?: string;
	style?: CSSProperties;
}
