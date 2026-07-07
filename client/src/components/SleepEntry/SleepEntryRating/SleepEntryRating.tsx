'use client';

import { CreateSleepEntryFormDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { Typography } from '@shared/ui';
import { useFormContext } from 'react-hook-form';
import styles from './SleepEntryRating.module.scss';
import { SleepEntryRatingStars } from './SleepEntryRatingStars';

export const SleepEntryRating = () => {
	const {
		formState: { errors },
	} = useFormContext<CreateSleepEntryFormDto>();

	const hasError = !!errors.rating;

	return (
		<div className={styles.rating}>
			<Typography as="p" variant="h4" color="secondary" align="center">
				Rate Your Sleep
			</Typography>
			<SleepEntryRatingStars />
			{hasError && (
				<Typography as="p" variant="body2" color="error" align="center">
					{errors.rating?.message}
				</Typography>
			)}
		</div>
	);
};
