'use client';

import { apiUsePromotion } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UsePromotionDto } from '@/dto';
import { usePromotionSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, SectionHeader, TextField } from '../UI';
import styles from './Promotion.module.scss';

const Promotion = () => {
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
		mutationFn: (data: UsePromotionDto) => apiUsePromotion(data),
		mutationKey: QUERY_KEYS.promotion.use,
		onSuccess: () => {
			toast.success('Promo code applied successfully!');
			reset({ alias: '' });
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to apply promo code.');
			reset({ alias: '' });
		},
	});

	const onSubmit = (data: UsePromotionDto) => mutate(data);

	return (
		<div className={styles['promotion']}>
			<div className={styles['promotion__content']}>
				<SectionHeader
					title="Redeem Code"
					description="Enter your promo code"
				/>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles['promotion__form']}
				>
					<div className={styles['promotion__field-wrapper']}>
						<TextField
							placeholder="Enter alias"
							className={styles['promotion__field']}
							error={errors.alias?.message && ''}
							fullWidth
							{...register('alias')}
						/>
						<Button
							type="submit"
							disabled={!isDirty}
							className={styles['promotion__button']}
							loading={isPending}
						>
							Use
						</Button>
					</div>
					{errors.alias && (
						<p className={styles['promotion__error']}>{errors.alias.message}</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default Promotion;
