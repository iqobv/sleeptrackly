'use client';

import { CreateSleepEntryFormDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { formatTime } from '@/utils/formatTime.util';
import { Typography } from '@shared/ui';
import { calculateSleepDuration } from '@shared/utils';
import { useMemo } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import styles from './SleepEntryForm.module.scss';
import { SleepEntryInfo } from './SleepEntryInfo/SleepEntryInfo';
import { SleepEntryRating } from './SleepEntryRating/SleepEntryRating';

interface SleepEntryFormBodyProps {
	isOnlyForm?: boolean;
	as?: React.ElementType;
	isCreate?: boolean;
	date?: Date;
}

export const SleepEntryFormBody = <
	D extends FieldValues = CreateSleepEntryFormDto,
>({
	isOnlyForm = false,
	as = 'div',
	isCreate = false,
	date,
}: SleepEntryFormBodyProps) => {
	const Component = as || 'div';

	const {
		watch,
		formState: { errors },
	} = useFormContext<D>();

	const formSleepStart = watch('sleepStart' as Path<D>);
	const formSleepEnd = watch('sleepEnd' as Path<D>);

	const sleepStart = useMemo(
		() => (formSleepStart ? new Date(formSleepStart) : new Date()),
		[formSleepStart],
	);

	const sleepEnd = useMemo(
		() => (formSleepEnd ? new Date(formSleepEnd) : new Date()),
		[formSleepEnd],
	);

	const sleepDuration: number = useMemo(() => {
		if (!formSleepStart || !formSleepEnd) return 0;
		const sleepDuration = calculateSleepDuration(
			sleepStart,
			sleepEnd,
		).sleepDuration;
		return sleepDuration < 0 ? 0 : sleepDuration;
	}, [sleepStart, sleepEnd, formSleepStart, formSleepEnd]);

	return (
		<Component className={styles.formBody}>
			<Typography as="p" variant="h2">
				{formatTime(sleepDuration).join(':')}
			</Typography>
			{errors.root && (
				<Typography as="p" color="error">
					{errors.root.message}
				</Typography>
			)}
			<SleepEntryInfo
				sleepStart={sleepStart}
				sleepEnd={sleepEnd}
				isOnlyForm={isOnlyForm}
				isCreate={isCreate}
				date={date}
			/>
			<SleepEntryRating />
		</Component>
	);
};
