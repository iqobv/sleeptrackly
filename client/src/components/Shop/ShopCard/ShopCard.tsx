import { makePurchase } from '@/api';
import { Coin } from '@/components/Icons';
import { Button } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { PRODUCT_TYPES } from '@/constants';
import { IProduct } from '@/types';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './ShopCard.module.scss';

interface ShopCardProps {
	product: IProduct;
}

const ShopCard = ({ product }: ShopCardProps) => {
	const [isOwned, setIsOwned] = useState(product.isOwned);

	const key =
		product.type === PRODUCT_TYPES.ITEM ? product.item : product.bundle;

	const { mutate, isPending } = useMutation({
		mutationFn: () => makePurchase(product.id),
		mutationKey: QUERY_KEYS.shop.makePurchase(product.id),
		onMutate: () => {
			setIsOwned(true);
		},
		onSuccess: () => {
			toast.success('Purchase successful!');
		},
		onError: (error) => {
			toast.error(error.message || 'Purchase failed. Please try again.');
			setIsOwned(false);
		},
	});

	return (
		<div className={styles['shop-card']}>
			<div className={styles['shop-card__image-wrapper']}>
				<Image
					src={`${process.env.NEXT_PUBLIC_CDN_URL}/${key?.mediaUrl}`}
					alt={key?.translation.name || 'Product Image'}
					width={160}
					height={160}
				/>
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
					variant={isOwned ? 'secondary' : 'contained'}
					type="button"
				>
					{isOwned ? 'Owned' : 'Buy Now'}
				</Button>
			</div>
		</div>
	);
};

export default ShopCard;
