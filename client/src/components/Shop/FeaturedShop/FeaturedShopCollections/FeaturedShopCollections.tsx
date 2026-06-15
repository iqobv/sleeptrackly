'use client';

import { FeaturedShopCollection } from '@/types/shop/featuredShop.types';
import { Grid, SectionHeader } from '@shared/ui';
import { FeaturedShopCollectionCard } from './FeaturedShopCollectionCard/FeaturedShopCollectionCard';

interface FeaturedShopCollectionsProps {
	collections: FeaturedShopCollection[];
}

export const FeaturedShopCollections = ({
	collections,
}: FeaturedShopCollectionsProps) => {
	return (
		<Grid columns={1}>
			<SectionHeader
				title="Collections"
				titleProps={{ variant: 'h2' }}
				padding={0}
			/>
			<Grid columns={1}>
				{collections.map((c) => (
					<FeaturedShopCollectionCard key={c.id} collection={c} />
				))}
			</Grid>
		</Grid>
	);
};
