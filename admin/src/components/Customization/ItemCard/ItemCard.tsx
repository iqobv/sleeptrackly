'use client';

import { CDNImage } from '@/components/UI';
import { Item } from '@/types';
import styles from './ItemCard.module.scss';

interface ItemCardProps {
	item: Item;
	actions?: React.ReactNode;
}

const ItemCard = ({ item, actions }: ItemCardProps) => {
	const translation =
		item.translations.find((t) => t.language === 'en')?.name ||
		item.translations[0]?.name ||
		'No translation';

	const imageUrl = item.previewUrl !== '' ? item.previewUrl : item.mediaUrl;

	return (
		<div key={item.id} className={styles.item}>
			<div className={styles.media}>
				{item.isAnimated ? (
					<video
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/${imageUrl}`}
						loop
						autoPlay
						muted
						width={200}
						height={200}
					/>
				) : (
					<CDNImage
						path={imageUrl}
						alt={translation}
						width={200}
						height={200}
					/>
				)}
			</div>
			<div>
				<h3>{translation}</h3>
				<p>Type: {item.type}</p>
				<p>Rarity: {item.rarity}</p>
			</div>
			{!!actions && <div className={styles.actions}>{actions}</div>}
		</div>
	);
};

export default ItemCard;
