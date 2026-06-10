import { ButtonProps, SectionHeaderProps } from '@shared/ui';
import { ReactNode } from 'react';

export interface PageHeaderProps {
	title: ReactNode;
	description?: ReactNode;
	sectionHeaderProps?: Omit<
		SectionHeaderProps,
		'title' | 'leftSlot' | 'description'
	>;
	showBackButton?: boolean;
	buttonProps?: Omit<ButtonProps, 'children'>;
	href?: string;
	buttonText?: string;
	customButton?: ReactNode;
	customRightSlot?: ReactNode;
}
