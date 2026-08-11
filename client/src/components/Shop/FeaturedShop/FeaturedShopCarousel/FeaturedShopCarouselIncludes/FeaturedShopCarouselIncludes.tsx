'use client';

import { ItemInBundle } from '@/types/bundle/itemInBundle.types';
import styles from './FeaturedShopCarouselIncludes.module.scss';

interface FeaturedShopCarouselIncludesProps {
	items: ItemInBundle[];
}

export const FeaturedShopCarouselIncludes = ({
	items,
}: FeaturedShopCarouselIncludesProps) => {
	return (
		<div className={styles.includes}>
			<p className={styles.bundleInfo}>Bundle includes {items.length} items:</p>
			<ul className={styles.list}>
				{items.map((bundleItem) => (
					<li className={styles.item} key={bundleItem.item.id}>
						{bundleItem.item.translation.name}
					</li>
				))}
			</ul>
		</div>
	);
};
