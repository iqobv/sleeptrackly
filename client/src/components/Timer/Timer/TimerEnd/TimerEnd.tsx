'use client';

import { PRIVATE_PAGES } from '@/config';
import { SleepEntry } from '@/types';
import { formatTime } from '@/utils';
import { Button } from '@shared/ui';
import dayjs from 'dayjs';
import Link from 'next/link';
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
			<Button variant="contained" color="secondary" asChild>
				<Link href={PRIVATE_PAGES.DASHBOARD}>View Statistics</Link>
			</Button>
		</div>
	);
};

export default TimerEnd;
