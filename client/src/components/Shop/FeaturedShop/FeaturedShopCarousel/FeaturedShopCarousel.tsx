'use client';

import { CDNImage } from '@/components/UI';
import { Product } from '@/types/product/product.types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './FeaturedShopCarousel.module.scss';
import { FeaturedShopCarouselBuyButton } from './FeaturedShopCarouselBuyButton/FeaturedShopCarouselBuyButton';
import { FeaturedShopCarouselIncludes } from './FeaturedShopCarouselIncludes/FeaturedShopCarouselIncludes';

interface FeaturedShopCarouselProps {
	data: Product[];
}

export const FeaturedShopCarousel = ({ data }: FeaturedShopCarouselProps) => {
	const validSlides = data.filter((item) => item.bundle);

	if (validSlides.length === 0) return null;

	return (
		<div className={styles.shopCarousel}>
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={0}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
				autoplay={{
					delay: 5000,
					pauseOnMouseEnter: true,
					disableOnInteraction: false,
				}}
				loop={validSlides.length > 1}
				className={styles.swiper}
			>
				{validSlides.map((item) => {
					if (!item.bundle) return null;

					return (
						<SwiperSlide key={item.id} className={styles.item}>
							<div className={styles.info}>
								{item.isNew && <div className={styles.new}>New</div>}
								<div className={styles.infoContent}>
									<h3 className={styles.title}>
										{item.bundle.translation.name}
									</h3>
									<FeaturedShopCarouselIncludes
										items={item.bundle.items || []}
									/>
								</div>
								<FeaturedShopCarouselBuyButton
									price={item.price}
									productId={item.id}
									discountedPrice={item.discountedPrice}
									discountPercentage={item.bundle.discountPercentage}
									basePrice={item.bundle.basePrice}
									expiresAt={item.expiresAt ? new Date(item.expiresAt) : null}
									isOwned={item.isOwned}
								/>
							</div>
							<div className={styles.imageWrapper}>
								<CDNImage
									path={item.bundle.mediaUrl}
									alt={item.bundle.translation.name || 'Featured Shop Item'}
									className={styles.image}
									width={300}
									height={300}
								/>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};
