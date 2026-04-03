'use client';

import { CDNImage } from '@/components/UI';
import { IItem, IProduct } from '@/types';
import styles from './ItemCard.module.scss';

interface ItemCardProps {
	product: IProduct;
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
		isItemImage && (finalProduct as IItem).previewUrl !== ''
			? (finalProduct as IItem).previewUrl
			: finalProduct.mediaUrl;

	return (
		<div key={finalProduct.id} className={styles['list-item']}>
			<div className={styles['list-item__media']}>
				{isItemImage && (finalProduct as IItem).isAnimated ? (
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
				{(finalProduct as IItem).type && (
					<p>
						Type:
						{(finalProduct as IItem).type}
					</p>
				)}
				{(finalProduct as IItem).rarity && (
					<p>Rarity: {(finalProduct as IItem).rarity}</p>
				)}
			</div>
			{!!actions && (
				<div className={styles['list-item__actions']}>{actions}</div>
			)}
		</div>
	);
};

export default ItemCard;
