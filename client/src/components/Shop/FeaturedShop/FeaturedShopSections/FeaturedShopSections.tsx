'use client';

import { Button, List } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config';
import { FeaturedShopSection } from '@/types';
import Link from 'next/link';
import ShopCard from '../../ShopCard/ShopCard';
import styles from './FeaturedShopSections.module.scss';
import { FEATURED_SHOP_SECTIONS_ITEMS } from './featuredShopSectionsItems';

interface FeaturedShopSectionsProps {
	sections: FeaturedShopSection[];
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
							<Button variant="link" size="sm" asChild>
								<Link
									href={`${PRIVATE_PAGES.SHOP.CATALOG}?itemType=${section.type.toLowerCase()}`}
								>
									View All
								</Link>
							</Button>
						</div>
						<List
							items={s.items}
							className={styles['featured-shop-sections__items']}
							renderItem={(item, index) => (
								<ShopCard key={item.id} product={item} isPreload={index < 3} />
							)}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default FeaturedShopSections;
