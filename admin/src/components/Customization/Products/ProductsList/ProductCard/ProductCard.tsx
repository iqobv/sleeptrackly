'use client';

import { Button, CDNImage } from '@/components/UI';
import { Product } from '@/types';

import { PAGES } from '@/config';
import Link from 'next/link';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
	product: Product;
	children?: (product: Product) => React.ReactNode;
}

export const ProductCard = ({ product, children }: ProductCardProps) => {
	const translation =
		product.type === 'BUNDLE'
			? product.bundle?.translations.find((t) => t.language === 'en')?.name
			: product.item?.translations.find((t) => t.language === 'en')?.name;

	return (
		<div className={styles.card}>
			<div className={styles.media}>
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
				{product.type === 'ITEM' && <p>Item Type: {product.item?.type}</p>}
			</div>
			<div className={styles.actions}>
				{children ? (
					children(product)
				) : (
					<Button variant="contained" color="secondary" fullWidth asChild>
						<Link href={PAGES.PRODUCT(product.id)} prefetch={false}>
							View
						</Link>
					</Button>
				)}
			</div>
		</div>
	);
};
