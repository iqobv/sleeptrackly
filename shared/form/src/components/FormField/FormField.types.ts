import { FieldProps } from '@shared/ui';
import { CSSProperties, ReactElement } from 'react';
import { FieldValues, Path } from 'react-hook-form';

export interface FormFieldProps<D extends FieldValues> extends Omit<
	FieldProps,
	'children'
> {
	name: Path<D>;
	children: ReactElement;
	hidden?: boolean;
	style?: CSSProperties;
}
