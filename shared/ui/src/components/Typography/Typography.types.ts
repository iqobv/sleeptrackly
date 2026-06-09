import { VariantProps } from 'class-variance-authority';
import { ElementType, HTMLAttributes, ReactNode } from 'react';
import { typographyVariants } from './typographyVariants';

export type TypographyVariants = VariantProps<typeof typographyVariants>;

export interface TypographyProps
	extends Omit<HTMLAttributes<HTMLElement>, 'color'>, TypographyVariants {
	children: ReactNode;
	as?: ElementType;
	maxLines?: number;
}
