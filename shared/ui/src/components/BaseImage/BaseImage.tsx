import clsx from 'clsx';
import styles from './BaseImage.module.scss';
import { BaseImageProps } from './BaseImage.types';

export const BaseImage = ({
	src,
	alt,
	width,
	height,
	className,
	priority = false,
	...props
}: BaseImageProps) => {
	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			loading={priority ? 'eager' : 'lazy'}
			fetchPriority={priority ? 'high' : 'auto'}
			className={clsx(styles.baseImage, className)}
			{...props}
		/>
	);
};
