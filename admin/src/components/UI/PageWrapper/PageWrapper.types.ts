import { CSSProperties, ReactNode } from 'react';
import { PageHeaderProps } from '../PageHeader/PageHeader.types';

export interface PageWrapperProps extends PageHeaderProps {
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	showBackButton?: boolean;
}
