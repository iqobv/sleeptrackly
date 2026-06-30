'use client';

import { Button } from '@shared/ui';
import { Reminder } from './Reminder/Reminder';
import styles from './Timer.module.scss';
import { TimerButtonLoader } from './TimerButtonLoader';
import { TimerContent } from './TimerContent/TimerContent';
import { TimerContentLoader } from './TimerContent/TimerContentLoader';
import { TimerEnd } from './TimerEnd/TimerEnd';
import { useTimer } from './useTimer';

export const Timer = () => {
	const {
		formatedTimer,
		isSleeping,
		isFinished,
		finishedSleep,
		isPending,
		isLoading,
		isFetched,
		startTimer,
		stopTimer,
		handleSaveSleep,
		resumeTimer,
	} = useTimer();

	const handleClick = () => {
		if (isSleeping) stopTimer();
		else startTimer();
	};

	return (
		<div className={styles.timer}>
			<div className={styles.timeContainer}>
				{isLoading || !isFetched ? (
					<TimerContentLoader />
				) : (
					<TimerContent time={formatedTimer} />
				)}
			</div>
			<div className={styles.control}>
				{isLoading || !isFetched ? (
					<TimerButtonLoader />
				) : (
					<>
						{isFinished && !!finishedSleep && <TimerEnd data={finishedSleep} />}
						<Button onClick={handleClick} loading={isPending}>
							{isSleeping ? 'Stop Timer' : 'Start Timer'}
						</Button>
					</>
				)}
			</div>
			<Reminder />
		</div>
	);
};
