import { ElementType } from 'react';
import { TypographyVariants } from './Typography.types';

export const defaultElementMapping: Record<
	NonNullable<TypographyVariants['variant']>,
	ElementType
> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	subtitle1: 'h6',
	subtitle2: 'h6',
	body1: 'p',
	body2: 'p',
	caption: 'span',
	overline: 'span',
};

export const defaultWeights: Record<
	NonNullable<TypographyVariants['variant']>,
	NonNullable<TypographyVariants['weight']>
> = {
	h1: 'bold',
	h2: 'bold',
	h3: 'semibold',
	h4: 'semibold',
	h5: 'medium',
	h6: 'medium',
	subtitle1: 'medium',
	subtitle2: 'medium',
	body1: 'regular',
	body2: 'regular',
	caption: 'regular',
	overline: 'semibold',
};
