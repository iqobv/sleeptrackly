import { Grid, SkeletonLoader } from '@shared/ui';
import { FeaturedShopCollectionCardLoader } from './FeaturedShopCollectionCard/FeaturedShopCollectionCardLoader';

export const FeaturedShopCollectionsLoader = () => {
	return (
		<Grid columns={1}>
			<SkeletonLoader width="10.625rem" height="2.4375rem" />
			{Array.from({ length: 2 }, (_, i) => (
				<FeaturedShopCollectionCardLoader key={i} />
			))}
		</Grid>
	);
};
