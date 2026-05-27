'use client';

import clsx from 'clsx';
import styles from './Loader.module.scss';
import { LoaderProps } from './Loader.types';

export const Loader = ({
	size = 30,
	thickness = 6,
	containerClassName,
	loaderClassName,
	disablePadding = false,
}: LoaderProps) => {
	return (
		<div
			className={clsx(
				styles.container,
				!disablePadding && styles.padding,
				containerClassName,
			)}
		>
			<div
				className={clsx(styles.loader, loaderClassName)}
				style={{
					width: size,
					height: size,
					['--thickness' as string]: `${thickness}px`,
				}}
			/>
		</div>
	);
};
