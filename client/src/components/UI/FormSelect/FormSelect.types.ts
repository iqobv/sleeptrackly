import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormSelectProps<T extends FieldValues> {
	name: Path<T>;
	control?: Control<T>;
	children: React.ReactNode;
	placeholder?: string;
	className?: string;
	id?: string;
}
