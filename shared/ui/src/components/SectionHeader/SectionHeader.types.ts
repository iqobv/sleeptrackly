import { CSSProperties, ElementType, ReactNode } from 'react';
import { TypographyProps } from '../Typography/Typography.types';

type ElementProps = Partial<
	Omit<TypographyProps<'span'>, 'children' | 'as'>
> & {
	as?: ElementType;
};

export interface SectionHeaderProps {
	title: ReactNode;
	description?: ReactNode;
	containerClassName?: string;
	padding?: number;
	gap?: number;
	titleProps?: ElementProps;
	descriptionProps?: ElementProps;
	textAlign?: CSSProperties['textAlign'];
	leftSlot?: ReactNode;
	rightSlot?: ReactNode;
	wrapperClassName?: string;
	rightSlotClassName?: string;
	leftSlotClassName?: string;
}

export interface SectionHeaderLoaderProps extends Pick<
	SectionHeaderProps,
	| 'containerClassName'
	| 'padding'
	| 'gap'
	| 'textAlign'
	| 'leftSlot'
	| 'rightSlot'
> {
	hasDescription?: boolean;
	titleWidth?: string | number;
	titleHeight?: string | number;
	descriptionWidth?: string | number;
	descriptionHeight?: string | number;
}
