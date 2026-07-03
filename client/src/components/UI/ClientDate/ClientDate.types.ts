import type { TypographyProps } from '@shared/ui';

export interface ClientDateProps extends Omit<
	TypographyProps<'time'>,
	'children' | 'as'
> {
	date: string | Date | number;
	options?: Intl.DateTimeFormatOptions;
}
