'use client';

import { Button, CDNImage } from '@/components/UI';
import { IProduct } from '@/types';

import { PAGES } from '@/config';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
	product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const translation =
		product.type === 'BUNDLE'
			? product.bundle?.translations.find((t) => t.language === 'en')?.name
			: product.item?.translations.find((t) => t.language === 'en')?.name;

	return (
		<div className={styles['product-card']}>
			<div className={styles['product-card__media']}>
				{product.item?.isAnimated ? (
					<video
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/${product.item.mediaUrl}`}
						loop
						autoPlay
						muted
						width={200}
						height={200}
					/>
				) : (
					<CDNImage
						src={product.item?.mediaUrl || product.bundle?.mediaUrl || ''}
						alt={translation}
						width={200}
						height={200}
					/>
				)}
			</div>
			<div>
				<h3>{translation || 'No translation'}</h3>
				<p>Type: {product.type}</p>
			</div>
			<div className={styles['product-card__actions']}>
				<Button variant="secondary" fullWidth href={PAGES.PRODUCT(product.id)}>
					View
				</Button>
			</div>
		</div>
	);
};

export default ProductCard;
