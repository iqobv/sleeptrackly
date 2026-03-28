'use client';

import { getFeaturedShop } from '@/api';
import { SectionHeader } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import styles from './FeaturedShop.module.scss';
import FeaturedShopBanner from './FeaturedShopBanner/FeaturedShopBanner';
import FeaturedShopCarousel from './FeaturedShopCarousel/FeaturedShopCarousel';
import FeaturedShopLoader from './FeaturedShopLoader';
import FeaturedShopSections from './FeaturedShopSections/FeaturedShopSections';

const FeaturedShop = () => {
	const { data, isLoading } = useQuery({
		queryFn: () => getFeaturedShop({ language: 'en' }),
		queryKey: QUERY_KEYS.shop.featured,
	});

	return (
		<div className={styles['featured-shop']}>
			{isLoading && <FeaturedShopLoader />}
			{!isLoading && data && (
				<>
					<div>
						<SectionHeader title="Featured Shop" />
						{data.carousel.length > 0 && (
							<FeaturedShopCarousel data={data.carousel} />
						)}
					</div>
					<FeaturedShopBanner />
					<div>
						<SectionHeader title="Shop by Category" titleComponent="h2" />
						<FeaturedShopSections sections={data.sections} />
					</div>
				</>
			)}
		</div>
	);
};

export default FeaturedShop;
