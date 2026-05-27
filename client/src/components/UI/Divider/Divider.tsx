'use client';

import clsx from 'clsx';
import styles from './Divider.module.scss';
import { DividerProps } from './Divider.types';

export const Divider = ({
	className,
	isVertical = false,
	thickness = 1,
}: DividerProps) => {
	return (
		<div
			style={
				{
					'--thickness': `${thickness}px`,
				} as React.CSSProperties
			}
			className={clsx(
				styles.divider,
				isVertical ? styles.vertical : styles.horizontal,
				className,
			)}
		/>
	);
};
