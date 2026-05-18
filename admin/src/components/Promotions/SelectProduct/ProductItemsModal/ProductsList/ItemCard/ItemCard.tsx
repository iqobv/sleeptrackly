'use client';

import { CDNImage } from '@/components/UI';
import { Item, Product } from '@/types';
import styles from './ItemCard.module.scss';

interface ItemCardProps {
	product: Product;
	actions?: React.ReactNode;
}

const ItemCard = ({ product, actions }: ItemCardProps) => {
	const finalProduct = product.type === 'ITEM' ? product.item : product.bundle;

	if (!finalProduct) return null;

	const translation =
		finalProduct.translations.find((t) => t.language === 'en')?.name ||
		finalProduct.translations[0]?.name ||
		'No translation';

	const isItemImage = product.type === 'ITEM';

	const imageUrl =
		isItemImage && (finalProduct as Item).previewUrl !== ''
			? (finalProduct as Item).previewUrl
			: finalProduct.mediaUrl;

	return (
		<div key={finalProduct.id} className={styles.item}>
			<div className={styles.media}>
				{isItemImage && (finalProduct as Item).isAnimated ? (
					<video
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/${imageUrl}`}
						loop
						autoPlay
						muted
						width={200}
						height={200}
					/>
				) : (
					<CDNImage src={imageUrl} alt={translation} width={200} height={200} />
				)}
			</div>
			<div>
				<h3>{translation}</h3>
				<p>Product Type: {product.type}</p>
				{(finalProduct as Item).type && (
					<p>
						Type:
						{(finalProduct as Item).type}
					</p>
				)}
				{(finalProduct as Item).rarity && (
					<p>Rarity: {(finalProduct as Item).rarity}</p>
				)}
			</div>
			{!!actions && <div className={styles.actions}>{actions}</div>}
		</div>
	);
};

export default ItemCard;
