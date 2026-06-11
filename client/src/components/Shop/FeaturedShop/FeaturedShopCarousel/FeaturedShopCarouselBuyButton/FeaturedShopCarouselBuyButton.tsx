'use client';

import { makePurchase } from '@/api/shop/shop.api';
import { Coin } from '@/components/Icons/Coin';
import { AUTH_PAGES } from '@/config/authPages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useAuth } from '@/hooks/useAuth.hook';
import { Button } from '@shared/ui';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import FeaturedShopCarouselCountdown from '../FeaturedShopCarouselCountdown';
import styles from './FeaturedShopCarouselBuyButton.module.scss';

interface FeaturedShopCarouselBuyButtonProps {
	price: number;
	discountedPrice: number | null;
	discountPercentage: number | null;
	productId: string;
	basePrice: number;
	expiresAt: Date | null;
}

export const FeaturedShopCarouselBuyButton = ({
	price,
	discountedPrice,
	productId,
	discountPercentage,
	basePrice,
	expiresAt,
}: FeaturedShopCarouselBuyButtonProps) => {
	const router = useRouter();

	const discountedPercentage = discountedPrice
		? ((basePrice - discountedPrice) / basePrice) * 100
		: 0;
	const finalDiscountPercentage = discountedPrice
		? discountedPercentage
		: (discountPercentage ?? 0);

	const { isAuthenticated } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationFn: () => makePurchase(productId),
		mutationKey: QUERY_KEYS.shop.makePurchase(productId),
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : 'Purchase failed');
		},
	});

	const handleClick = () => {
		if (!isAuthenticated) {
			toast.info('Please log in to make a purchase.');
			router.push(AUTH_PAGES.LOGIN);
			return;
		}

		mutate();
	};

	return (
		<div className={styles['buy-button-container']}>
			<div className={styles['buy-button-content']}>
				<Button
					onClick={handleClick}
					loading={isPending}
					className={styles['buy-button']}
				>
					Buy Now |{' '}
					<div className={styles['price-info']}>
						<span className={styles['price']}>{basePrice || price}</span>
						<span className={styles['discounted-price']}>
							{Math.round(discountedPrice || price)}
						</span>
					</div>
					<Coin width={26} height={26} />
				</Button>
				{expiresAt && (
					<FeaturedShopCarouselCountdown endDate={new Date(expiresAt)} />
				)}
			</div>
			{finalDiscountPercentage > 0 && (
				<div className={styles['discount-badge']}>
					Buy now and save {Math.round(finalDiscountPercentage)}%
				</div>
			)}
		</div>
	);
};
