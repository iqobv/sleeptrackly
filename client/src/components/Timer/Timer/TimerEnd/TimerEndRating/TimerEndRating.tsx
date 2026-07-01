'use client';

import { UpdateSleepEntryDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { Typography } from '@shared/ui';
import { useFormContext } from 'react-hook-form';
import styles from './TimerEndRating.module.scss';
import { TimerEndStars } from './TimerEndStars';

export const TimerEndRating = () => {
	const {
		formState: { errors },
	} = useFormContext<UpdateSleepEntryDto>();

	const hasError = !!errors.rating;

	return (
		<div className={styles.rating}>
			<Typography as="p" variant="h4" color="secondary" align="center">
				Rate Your Sleep
			</Typography>
			<TimerEndStars />
			{hasError && (
				<Typography as="p" variant="body2" color="error" align="center">
					{errors.rating?.message}
				</Typography>
			)}
		</div>
	);
};
