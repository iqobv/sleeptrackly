import { CSSProperties } from 'react';
import { TypographyProps } from '../Typography/Typography.types';

type ElementProps = Partial<Omit<TypographyProps, 'children'>>;

export interface SectionHeaderProps {
	title: React.ReactNode;
	description?: React.ReactNode;
	containerClassName?: string;
	padding?: number;
	gap?: number;
	titleProps?: ElementProps;
	descriptionProps?: ElementProps;
	textAlign?: CSSProperties['textAlign'];
	leftSlot?: React.ReactNode;
	rightSlot?: React.ReactNode;
}
