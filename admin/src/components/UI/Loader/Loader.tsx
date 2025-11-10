'use client';

import styles from './Loader.module.scss';
import { LoaderProps } from './Loader.types';

export default function Loader({
	size = 30,
	thickness = 6,
	containerClassName,
	loaderClassName,
	disablePadding = false,
}: LoaderProps) {
	return (
		<div
			className={`${styles.loader__container} ${
				disablePadding ? '' : styles.loader__padding
			} ${containerClassName}`}
		>
			<div
				className={`${styles.loader} ${loaderClassName}`}
				style={{
					width: size,
					height: size,
					['--thickness' as string]: `${thickness}px`,
				}}
			/>
		</div>
	);
}
