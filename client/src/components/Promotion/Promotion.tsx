'use client';

import { usePromotion } from '@/api/promotion/promotion.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { UsePromotionDto } from '@/dto/promotion/promotion.dto';
import { usePromotionSchema } from '@/schemas/promotion/promotion.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Field, Input, SectionHeader } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './Promotion.module.scss';

export const Promotion = () => {
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm<UsePromotionDto>({
		resolver: zodResolver(usePromotionSchema),
		defaultValues: { alias: '' },
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: UsePromotionDto) => usePromotion(data),
		onSuccess: () => {
			toast.success('Promo code applied successfully!');
			reset({ alias: '' });
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.coin.userCoin,
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.inventory.lists(),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.shop.all,
			});
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to apply promo code.');
			reset({ alias: '' });
		},
	});

	const onSubmit = (data: UsePromotionDto) => mutate(data);

	return (
		<div className={styles.promotion}>
			<div className={styles.content}>
				<SectionHeader
					title="Redeem Code"
					description="Enter your promo code"
					textAlign="center"
				/>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<Field error={errors.alias?.message} label="Promo Code" required>
						<Input
							placeholder="Enter alias"
							rightSection={
								<Button
									type="submit"
									disabled={!isDirty}
									className={styles.button}
									loading={isPending}
								>
									Use
								</Button>
							}
							{...register('alias')}
						/>
					</Field>
				</form>
			</div>
		</div>
	);
};
