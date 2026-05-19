import { Path } from 'react-hook-form';
import { Option } from './option.types';

export interface Field<T> {
	name: Path<T>;
	label: string;
	placeholder: string;
	type?: React.ComponentProps<'input'>['type'] | 'select';
	autoComplete?: React.ComponentProps<'input'>['autoComplete'];
	options?: Option[];
	required?: boolean;
}
