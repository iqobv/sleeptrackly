import { CSSProperties } from 'react';

export interface FormActionsProps {
	children: React.ReactNode;
	className?: string;
	justifyContent?: CSSProperties['justifyContent'];
	style?: CSSProperties;
}
