'use client';

import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { FeaturedShopSection } from '@/types/shop/featuredShopSection.types';
import { Button, List } from '@shared/ui';
import Link from 'next/link';
import { ShopCard } from '../../ShopCard/ShopCard';
import styles from './FeaturedShopSections.module.scss';
import { FEATURED_SHOP_SECTIONS_ITEMS } from './featuredShopSectionsItems';

interface FeaturedShopSectionsProps {
	sections: FeaturedShopSection[];
}

export const FeaturedShopSections = ({
	sections,
}: FeaturedShopSectionsProps) => {
	return (
		<div className={styles.sections}>
			{sections.map((s) => {
				const section = FEATURED_SHOP_SECTIONS_ITEMS.find(
					(item) => item.type === s.itemType,
				);

				if (!section) return null;

				return (
					<div key={section.type} className={styles.section}>
						<div className={styles.header}>
							<h3 className={styles.title}>{section.title}</h3>
							<Button variant="link" size="sm" asChild>
								<Link
									href={`${PRIVATE_PAGES.SHOP.CATALOG}?itemType=${section.type.toUpperCase()}`}
								>
									View All
								</Link>
							</Button>
						</div>
						<List
							items={s.items}
							className={styles.items}
							renderItem={(item) => <ShopCard key={item.id} product={item} />}
						/>
					</div>
				);
			})}
		</div>
	);
};
