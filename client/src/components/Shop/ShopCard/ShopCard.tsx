'use client';

import { makePurchase } from '@/api';
import { Coin } from '@/components/Icons';
import { CDNImage } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { Item, Product, ProductType } from '@/types';
import { Button } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './ShopCard.module.scss';

interface ShopCardProps {
	product: Product;
}

export const ShopCard = ({ product }: ShopCardProps) => {
	const [isOwned, setIsOwned] = useState(product.isOwned);
	const queryClient = useQueryClient();

	const key = product.type === ProductType.ITEM ? product.item : product.bundle;

	const { mutate, isPending } = useMutation({
		mutationFn: () => makePurchase(product.id),
		mutationKey: QUERY_KEYS.shop.makePurchase(product.id),
		onMutate: () => {
			setIsOwned(true);
		},
		onSuccess: () => {
			toast.success('Purchase successful!');
			queryClient.refetchQueries({
				queryKey: QUERY_KEYS.coin.userCoin,
			});
		},
		onError: (error) => {
			toast.error(error.message || 'Purchase failed. Please try again.');
			setIsOwned(false);
		},
	});

	const url: string =
		product.type === ProductType.ITEM
			? (key as Item)?.previewUrl
				? (key as Item)?.previewUrl
				: (key as Item)?.mediaUrl
			: (key?.mediaUrl ?? '');

	return (
		<div className={styles['shop-card']}>
			<div className={styles['shop-card__image-wrapper']}>
				{product.item?.isAnimated ? (
					<video
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/${url}`}
						loop
						autoPlay
						muted
						width={160}
						height={160}
						className={styles['shop-card__video']}
					/>
				) : (
					<CDNImage
						path={url}
						alt={key?.translation.name || 'Product Image'}
						width={160}
						height={160}
					/>
				)}
			</div>
			<div>
				<h4 className={styles['shop-card__title']}>{key?.translation.name}</h4>
			</div>
			<div className={styles['shop-card__actions']}>
				<div className={styles['shop-card__price']}>
					<span className={styles['shop-card__price-original']}>
						{product.price}
					</span>
					{product.discountedPrice && (
						<span className={styles['shop-card__price-discounted']}>
							{product.discountedPrice}
						</span>
					)}
					<Coin width={26} height={26} />
				</div>
				<Button
					onClick={() => mutate()}
					loading={isPending}
					disabled={isOwned}
					variant="contained"
					color={isOwned ? 'secondary' : 'primary'}
					type="button"
				>
					{isOwned ? 'Owned' : 'Buy Now'}
				</Button>
			</div>
		</div>
	);
};
