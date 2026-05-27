import { pxToRem } from '@/utils';
import clsx from 'clsx';
import { CSSProperties } from 'react';
import styles from './Grid.module.scss';
import { GridProps } from './Grid.types';

export const Grid = ({
	children,
	as = 'div',
	columns,
	gap = 24,
	rowGap,
	columnGap,
	alignItems,
	justifyContent,
	className,
	isInline = false,
	style,
	oneColumnOnMobile = true,
	...rest
}: GridProps) => {
	const Component = as;

	const gridStyle: CSSProperties = {
		'--grid-columns':
			typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
		'--grid-gap': gap !== undefined ? pxToRem(gap) : undefined,
		'--grid-row-gap': rowGap !== undefined ? pxToRem(rowGap) : undefined,
		'--grid-column-gap':
			columnGap !== undefined ? pxToRem(columnGap) : undefined,
		alignItems,
		justifyContent,
		...style,
	} as CSSProperties;

	return (
		<Component
			className={clsx(
				isInline ? styles.inlineGrid : styles.grid,
				oneColumnOnMobile && styles.oneColumnOnMobile,
				className,
			)}
			style={gridStyle}
			{...rest}
		>
			{children}
		</Component>
	);
};
