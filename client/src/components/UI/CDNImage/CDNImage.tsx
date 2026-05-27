import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import styles from './CDNImage.module.scss';

interface CDNImageProps extends ImageProps {
	src: string;
}

export const CDNImage = ({
	src,
	width = 100,
	height = 100,
	alt = 'image',
	className,
	...props
}: CDNImageProps) => {
	return (
		<Image
			src={`${process.env.NEXT_PUBLIC_CDN_URL}/${src}`}
			width={width}
			height={height}
			alt={alt}
			className={clsx(styles.cdnImage, className)}
			{...props}
		/>
	);
};
