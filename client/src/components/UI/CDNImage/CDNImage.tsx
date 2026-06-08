import { BaseImage, type BaseImageProps } from '@shared/ui';

type CDNImageProps = Omit<BaseImageProps, 'src'> & {
	path: string;
};

export const CDNImage = ({ path, ...props }: CDNImageProps) => {
	const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL as string;
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	const fullSrc = `${cdnUrl}/${cleanPath}`;

	return <BaseImage src={fullSrc} {...props} />;
};
