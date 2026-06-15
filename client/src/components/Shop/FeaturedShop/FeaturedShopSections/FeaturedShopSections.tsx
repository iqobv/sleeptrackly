'use client';

import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { FeaturedShopSection } from '@/types/shop/featuredShop.types';
import { Button, Grid, GridItem } from '@shared/ui';
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
						<Grid
							oneColumnOnMobile={false}
							columns="repeat(auto-fit, minmax(250px, 1fr))"
						>
							{s.items.map((item) => (
								<GridItem key={item.id}>
									<ShopCard product={item} />
								</GridItem>
							))}
						</Grid>
					</div>
				);
			})}
		</div>
	);
};
