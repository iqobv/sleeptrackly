'use client';

import { UpdateSleepEntryDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { formatTime } from '@/utils/formatTime.util';
import { ModalBody, Typography } from '@shared/ui';
import { calculateSleepDuration } from '@shared/utils';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { TimerEndInfo } from '../TimerEndInfo/TimerEndInfo';
import { TimerEndRating } from '../TimerEndRating/TimerEndRating';
import styles from './TimerEndBody.module.scss';

export const TimerEndBody = () => {
	const { watch } = useFormContext<UpdateSleepEntryDto>();

	const formSleepStart = watch('sleepStart');
	const formSleepEnd = watch('sleepEnd');

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
		return calculateSleepDuration(sleepStart, sleepEnd).sleepDuration;
	}, [sleepStart, sleepEnd, formSleepStart, formSleepEnd]);

	return (
		<ModalBody className={styles.modalBody}>
			<Typography as="p" variant="h2">
				{formatTime(sleepDuration).join(':')}
			</Typography>
			<TimerEndInfo sleepStart={sleepStart} sleepEnd={sleepEnd} />
			<TimerEndRating />
		</ModalBody>
	);
};
