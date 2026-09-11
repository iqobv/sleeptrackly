'use client';

import { ShopCard } from '@/components/Shop/ShopCard/ShopCard';
import { CDNImage } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { FeaturedShopCollection } from '@/types/shop/featuredShop.types';
import { Button, Grid, GridItem, SectionHeader } from '@shared/ui';
import Link from 'next/link';
import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import styles from './FeaturedShopCollectionCard.module.scss';

interface FeaturedShopCollectionCardProps {
	collection: FeaturedShopCollection;
}

export const FeaturedShopCollectionCard = ({
	collection,
}: FeaturedShopCollectionCardProps) => {
	return (
		<Grid
			className={styles.card}
			columns={1}
			style={
				{ '--collection-accent': collection.accentColor } as React.CSSProperties
			}
		>
			<SectionHeader
				title={collection.name}
				titleProps={{ variant: 'h4' }}
				padding={0}
				rightSlot={
					<Button variant="link" asChild>
						<Link
							href={`${PRIVATE_PAGES.SHOP.CATALOG}?collection=${collection.slug}`}
						>
							Explore <MdArrowForward />
						</Link>
					</Button>
				}
			/>
			<div className={styles.container}>
				<div className={styles.imageWrapper}>
					<CDNImage
						path={collection.iconUrl}
						alt={collection.name}
						height={200}
						width={200}
					/>
				</div>
				<Grid
					columns={'repeat(auto-fit, minmax(250px, 1fr))'}
					oneColumnOnMobile={false}
					style={{ flex: 1 }}
				>
					{collection.products.map((p) => (
						<GridItem key={`${p.collectionId}_${p.productId}`}>
							<ShopCard product={p.product} />
						</GridItem>
					))}
				</Grid>
			</div>
		</Grid>
	);
};
