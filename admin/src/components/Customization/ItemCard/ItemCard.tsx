'use client';

import { CDNImage } from '@/components/UI';
import { IItem } from '@/types';
import styles from './ItemCard.module.scss';

interface ItemCardProps {
	item: IItem;
	actions?: React.ReactNode;
}

const ItemCard = ({ item, actions }: ItemCardProps) => {
	const translation =
		item.translations.find((t) => t.language === 'en')?.name ||
		item.translations[0]?.name ||
		'No translation';

	return (
		<div key={item.id} className={styles['list-item']}>
			<div className={styles['list-item__media']}>
				{item.type === 'ANIMATED_AVATAR' ? (
					<video
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/${item.mediaUrl}`}
						loop
						autoPlay
						muted
						width={200}
						height={200}
					/>
				) : (
					<CDNImage
						src={item.mediaUrl}
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
			{!!actions && (
				<div className={styles['list-item__actions']}>{actions}</div>
			)}
		</div>
	);
};

export default ItemCard;
