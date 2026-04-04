'use client';

import { IProduct } from '@/types';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { CDNImage } from '@/components/UI';
import styles from './FeaturedShopCarousel.module.scss';
import FeaturedShopCarouselBuyButton from './FeaturedShopCarouselBuyButton/FeaturedShopCarouselBuyButton';
import FeaturedShopCarouselIncludes from './FeaturedShopCarouselIncludes/FeaturedShopCarouselIncludes';

interface FeaturedShopCarouselProps {
	data: IProduct[];
}

const FeaturedShopCarousel = ({ data }: FeaturedShopCarouselProps) => {
	const validSlides = data.filter((item) => item.bundle);

	if (validSlides.length === 0) {
		return null;
	}

	return (
		<div className={styles['featured-shop-carousel']}>
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
				className={styles['custom-swiper']}
			>
				{validSlides.map((item) => {
					if (!item.bundle) return null;

					return (
						<SwiperSlide
							key={item.id}
							className={styles['featured-shop-carousel__item']}
						>
							<div className={styles['featured-shop-carousel__info']}>
								{item.isNew && (
									<div className={styles['featured-shop-carousel__new']}>
										New
									</div>
								)}
								<div className={styles['featured-shop-carousel__info-content']}>
									<h3 className={styles['featured-shop-carousel__title']}>
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
								/>
							</div>
							<div className={styles['image-wrapper']}>
								<CDNImage
									src={item.bundle.mediaUrl}
									alt={item.bundle.translation.name || 'Featured Shop Item'}
									preload
									className={styles['featured-shop-carousel__image']}
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

export default FeaturedShopCarousel;
