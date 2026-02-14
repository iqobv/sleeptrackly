'use client';

import { CDNImage } from '@/components/UI';
import { IBundle } from '@/types';

import styles from '../ItemCard/ItemCard.module.scss';

interface BundleCardProps {
	bundle: IBundle;
	actions: React.ReactNode;
}

const BundleCard = ({ bundle, actions }: BundleCardProps) => {
	const translation =
		bundle.translations.find((t) => t.language === 'en')?.name ||
		bundle.translations[0]?.name ||
		'No translation';

	return (
		<div key={bundle.id} className={styles['list-item']}>
			<div className={styles['list-item__media']}>
				<CDNImage
					src={bundle.mediaUrl}
					alt={translation}
					width={200}
					height={200}
				/>
			</div>
			<div>
				<h3>{translation}</h3>
			</div>
			{!!actions && (
				<div className={styles['list-item__actions']}>{actions}</div>
			)}
		</div>
	);
};

export default BundleCard;
