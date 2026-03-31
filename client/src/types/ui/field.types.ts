import { Path } from 'react-hook-form';

export interface IField<T> {
	name: Path<T>;
	label: React.ReactNode;
	placeholder: string;
	type?: React.ComponentProps<'input'>['type'];
	autocomplete?: React.ComponentProps<'input'>['autoComplete'];
}
