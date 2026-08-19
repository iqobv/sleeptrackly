import { env } from '@/env';
import { BaseImage, type BaseImageProps } from '@shared/ui';

type CDNImageProps = Omit<BaseImageProps, 'src'> & {
	path: string;
};

export const CDNImage = ({ path, ...props }: CDNImageProps) => {
	const cdnUrl = env.NEXT_PUBLIC_CDN_URL;
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	const fullSrc = `${cdnUrl}/${cleanPath}`;

	return <BaseImage src={fullSrc} {...props} />;
};
