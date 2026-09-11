import { VariantProps } from 'class-variance-authority';
import { ComponentProps, ElementType, ReactNode } from 'react';
import { typographyVariants } from './typographyVariants';

export type TypographyVariants = VariantProps<typeof typographyVariants>;

export type TypographyProps<C extends ElementType = 'p'> = {
	as?: C;
	children: ReactNode;
	maxLines?: number;
} & Omit<ComponentProps<C>, 'color' | 'as'> &
	TypographyVariants;
