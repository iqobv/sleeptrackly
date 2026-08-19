import { env } from '@/env';
import { Item } from '@/types/item/item.types';
import { Product } from '@/types/product/product.types';
import { ProductType } from '@shared/types';
import { CDNImage } from '../CDNImage/CDNImage';
import styles from './ProductImage.module.scss';

interface ProductImageProps {
	product: Product;
	width?: number;
	height?: number;
}

const CDN_URL = env.NEXT_PUBLIC_CDN_URL;

export const ProductImage = ({ product, height, width }: ProductImageProps) => {
	const key = product.type === ProductType.ITEM ? product.item : product.bundle;

	const url: string =
		product.type === ProductType.ITEM
			? (key as Item)?.previewUrl
				? (key as Item)?.previewUrl
				: (key as Item)?.mediaUrl
			: (key?.mediaUrl ?? '');

	if (product.item?.isAnimated)
		return (
			<video
				src={`${CDN_URL}/${url}`}
				loop
				autoPlay
				muted
				width={width}
				height={height}
				className={styles.video}
			/>
		);

	return (
		<CDNImage
			path={url}
			alt={key?.translation.name || 'Product Image'}
			width={width}
			height={height}
		/>
	);
};
