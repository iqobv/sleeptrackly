import { Path } from 'react-hook-form';
import { IOption } from './option.types';

export interface IField<T> {
	name: Path<T>;
	label: string;
	placeholder: string;
	type?: React.ComponentProps<'input'>['type'] | 'select';
	autocomplete?: React.ComponentProps<'input'>['autoComplete'];
	options?: IOption[];
}
