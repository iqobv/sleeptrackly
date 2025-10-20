'use client';

import { Button } from '@/components/UI';
import { PAGES } from '@/config';
import { ISleepEntry } from '@/types';
import { formatTime } from '@/utils';
import dayjs from 'dayjs';
import styles from './TimerEnd.module.scss';

interface TimerEndProps {
	data: ISleepEntry;
}

const TimerEnd = ({ data }: TimerEndProps) => {
	const { sleepDuration, sleepStart, sleepEnd } = data;

	return (
		<div className={styles['timer__end']}>
			<p>Your sleep duration: {formatTime(sleepDuration).join(':')}</p>
			<p>Started at: {dayjs(sleepStart).format('DD.MM.YYYY HH:mm:ss')}</p>
			<p>Ended at: {dayjs(sleepEnd).format('DD.MM.YYYY HH:mm:ss')}</p>
			<Button variant="secondary" href={PAGES.DASHBOARD}>
				View Statistics
			</Button>
		</div>
	);
};

export default TimerEnd;
