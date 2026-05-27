import { CSSProperties } from 'react';
import { BackButtonProps } from '../BackButton';
import { TypographyProps } from '../Typography';

type ElementProps = Omit<TypographyProps, 'children'>;

export interface SectionHeaderProps {
	title: React.ReactNode;
	description?: React.ReactNode;
	containerClassName?: string;
	padding?: number;
	gap?: number;
	textAlign?: CSSProperties['textAlign'];
	showBackButton?: boolean;
	titleProps?: ElementProps;
	descriptionProps?: ElementProps;
	backButtonProps?: BackButtonProps;
}
