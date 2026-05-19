import { Control, FieldValues, Path } from 'react-hook-form';
import { SelectValue } from '../Select/Select.types';

export interface FormSelectProps<T extends FieldValues> {
	name: Path<T>;
	control?: Control<T>;
	multiple?: boolean;
	children: React.ReactNode;
	placeholder?: string;
	className?: string;
	displayFormat?: (value: SelectValue | undefined) => string;
	customTrigger?: React.ReactNode;
}
