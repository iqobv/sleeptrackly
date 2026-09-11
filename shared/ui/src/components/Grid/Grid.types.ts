import { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';

export interface GridProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
	as?: ElementType;
	columns?: number | string;
	gap?: number;
	rowGap?: number;
	columnGap?: number;
	alignItems?: CSSProperties['alignItems'];
	justifyContent?: CSSProperties['justifyContent'];
	className?: string;
	isInline?: boolean;
	oneColumnOnMobile?: boolean;
	stretchLastOdd?: boolean;
}

export interface GridItemProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
	as?: ElementType;
	columnSpan?: number | string;
	rowSpan?: number | string;
	className?: string;
}
