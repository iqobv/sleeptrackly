import { TypographyProps } from '@shared/ui';

export interface ClientDateRangeProps extends Omit<
	TypographyProps<'span'>,
	'children' | 'as'
> {
	start: string | Date | number;
	end: string | Date | number;
}
