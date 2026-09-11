'use client';

import { CreateSleepEntryFormDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconBaseProps } from 'react-icons';
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';
import styles from './SleepEntryRating.module.scss';

const iconProps: IconBaseProps = {
	size: 24,
	color: 'var(--sleep-end-star-color)',
};

export const SleepEntryRatingStars = () => {
	const [hover, setHover] = useState(0);

	const { watch, setValue, clearErrors } =
		useFormContext<CreateSleepEntryFormDto>();

	const rating = watch('rating');

	const handleRating = (currentRating: number) => {
		setValue('rating', currentRating);
		clearErrors('rating');
	};

	return (
		<div className={styles.stars}>
			{Array.from({ length: 5 }).map((_, i) => {
				const value = i + 1;

				return (
					<button
						onClick={() => handleRating(value)}
						onMouseEnter={() => setHover(value)}
						onMouseLeave={() => setHover(0)}
						key={value}
						type="button"
						className={styles.starButton}
					>
						{(rating ?? 0) >= value || hover >= value ? (
							<MdOutlineStar {...iconProps} />
						) : (
							<MdOutlineStarBorder {...iconProps} />
						)}
					</button>
				);
			})}
		</div>
	);
};
