'use client';

import { Button } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config';
import { SleepEntry } from '@/types';
import { formatTime } from '@/utils';
import dayjs from 'dayjs';
import styles from './TimerEnd.module.scss';

interface TimerEndProps {
	data: SleepEntry;
}

const TimerEnd = ({ data }: TimerEndProps) => {
	const { sleepDuration, sleepStart, sleepEnd } = data;

	return (
		<div className={styles['timer__end']}>
			<p>Your sleep duration: {formatTime(sleepDuration).join(':')}</p>
			<p>Started at: {dayjs(sleepStart).format('DD.MM.YYYY HH:mm:ss')}</p>
			<p>Ended at: {dayjs(sleepEnd).format('DD.MM.YYYY HH:mm:ss')}</p>
			<Button variant="secondary" href={PRIVATE_PAGES.DASHBOARD}>
				View Statistics
			</Button>
		</div>
	);
};

export default TimerEnd;
