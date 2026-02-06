'use client';

import { Button } from '@/components/UI';
import { IFeaturedShopSection } from '@/types';
import ShopCard from '../../ShopCard/ShopCard';
import styles from './FeaturedShopSections.module.scss';
import { FEATURED_SHOP_SECTIONS_ITEMS } from './featuredShopSectionsItems';

interface FeaturedShopSectionsProps {
	sections: IFeaturedShopSection[];
}

const FeaturedShopSections = ({ sections }: FeaturedShopSectionsProps) => {
	return (
		<div className={styles['featured-shop-sections']}>
			{sections.map((s) => {
				const section = FEATURED_SHOP_SECTIONS_ITEMS.find(
					(item) => item.type === s.itemType,
				);

				if (!section) return null;

				return (
					<div
						key={section.type}
						className={styles['featured-shop-sections__section']}
					>
						<div className={styles['featured-shop-sections__header']}>
							<h3 className={styles['featured-shop-sections__title']}>
								{section.title}
							</h3>
							<Button
								variant="link"
								size="sm"
								href={`/shop/catalog?itemType=${section.type.toLowerCase()}`}
							>
								View All
							</Button>
						</div>
						<div className={styles['featured-shop-sections__items']}>
							{s.items.map((item) => (
								<ShopCard key={item.id} product={item} />
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default FeaturedShopSections;
