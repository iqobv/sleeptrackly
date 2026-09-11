import { ImgHTMLAttributes } from 'react';

export interface BaseImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
	priority?: boolean;
}
