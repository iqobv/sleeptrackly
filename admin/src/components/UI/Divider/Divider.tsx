'use client';

import styles from './Divider.module.scss';
import { DividerProps } from './Divider.types';

export default function Divider({
	className,
	isVertical = false,
	thickness = 1,
}: DividerProps) {
	return (
		<div
			style={{
				['--thickness' as string]: `${thickness}px`,
			}}
			className={`${styles['divider']} ${
				isVertical ? styles['divider--vertical'] : styles['divider--horizontal']
			} ${className}`}
		/>
	);
}
