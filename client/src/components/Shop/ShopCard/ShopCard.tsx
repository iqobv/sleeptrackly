'use client';

import { makePurchase } from '@/api/shop/shop.api';
import { Coin } from '@/components/Icons/Coin';
import { ProductImage } from '@/components/UI';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Item } from '@/types/item/item.types';
import { Product } from '@/types/product/product.types';
import { formatNumber } from '@/utils/numberFormatter.util';
import { Button, Typography } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './ShopCard.module.scss';
import { ProductType } from '@shared/types';

interface ShopCardProps {
	product: Product;
}

export const ShopCard = ({ product }: ShopCardProps) => {
	const [isOwned, setIsOwned] = useState(product.isOwned);
	const queryClient = useQueryClient();

	const key = product.type === ProductType.ITEM ? product.item : product.bundle;

	const { mutate, isPending } = useMutation({
		mutationFn: () => makePurchase(product.id),
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
		<div className={styles.card}>
			<div className={styles.imageWrapper}>
				<ProductImage product={product} height={160} width={160} />
			</div>
			<div>
				<Typography variant="h4" className={styles.title}>
					{key?.translation.name}
				</Typography>
			</div>
			<div className={styles.actions}>
				<div className={styles.price}>
					<span className={styles.priceOriginal}>
						{formatNumber(product.price)}
					</span>
					{product.discountedPrice && (
						<span className={styles.priceDiscounted}>
							{formatNumber(product.discountedPrice)}
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
