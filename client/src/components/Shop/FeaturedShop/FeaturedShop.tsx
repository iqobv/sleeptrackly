'use client';

import { getFeaturedShop } from '@/api/shop/shop.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { SectionHeader } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import styles from './FeaturedShop.module.scss';
import { FeaturedShopBanner } from './FeaturedShopBanner/FeaturedShopBanner';
import { FeaturedShopCarousel } from './FeaturedShopCarousel/FeaturedShopCarousel';
import { FeaturedShopCollections } from './FeaturedShopCollections/FeaturedShopCollections';
import { FeaturedShopLoader } from './FeaturedShopLoader';
import { FeaturedShopSections } from './FeaturedShopSections/FeaturedShopSections';

export const FeaturedShop = () => {
	const { data, isLoading } = useQuery({
		queryFn: () => getFeaturedShop({ language: 'en' }),
		queryKey: QUERY_KEYS.shop.featured,
	});

	return (
		<div className={styles.featuredShop}>
			{isLoading && <FeaturedShopLoader />}
			{!isLoading && data && (
				<>
					<div>
						<SectionHeader title="Featured Shop" />
						{data.carousel.length > 0 && (
							<FeaturedShopCarousel data={data.carousel} />
						)}
					</div>
					{data.collections.length > 0 && (
						<FeaturedShopCollections collections={data.collections} />
					)}
					<FeaturedShopBanner />
					<div>
						<SectionHeader
							title="Shop by Category"
							titleProps={{
								variant: 'h2',
							}}
						/>
						<FeaturedShopSections sections={data.sections} />
					</div>
				</>
			)}
		</div>
	);
};
