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
		<div className={styles['featured-shop-carousel-includes']}>
			<p className={styles['featured-shop-carousel-includes__bundle-info']}>
				Bundle includes {items.length} items:
			</p>
			<ul className={styles['featured-shop-carousel-includes__item-list']}>
				{items.map((bundleItem) => (
					<li
						className={
							styles['featured-shop-carousel-includes__item-list-item']
						}
						key={bundleItem.item.id}
					>
						{bundleItem.item.translation.name}
					</li>
				))}
			</ul>
		</div>
	);
};
