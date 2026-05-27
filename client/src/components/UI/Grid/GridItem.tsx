'use client';

import { CSSProperties } from 'react';
import { GridItemProps } from './Grid.types';

export const GridItem = ({
	children,
	as = 'div',
	columnSpan,
	rowSpan,
	className = '',
	style,
	...rest
}: GridItemProps) => {
	const Component = as;

	const itemStyle: CSSProperties = {
		gridColumn: columnSpan,
		gridRow: rowSpan,
		...style,
	};

	return (
		<Component className={className} style={itemStyle} {...rest}>
			{children}
		</Component>
	);
};
