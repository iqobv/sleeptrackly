'use client';

import { Button, List } from '@shared/ui';
import styles from './Timer.module.scss';
import TimerButtonLoader from './TimerButtonLoader';
import TimerEnd from './TimerEnd/TimerEnd';
import TimerLoader from './TimerLoader';
import { useTimer } from './useTimer';

const labels = ['Hours', 'Minutes', 'Seconds'];

const Timer = () => {
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
	} = useTimer();

	const handleClick = () => {
		if (isSleeping) stopTimer();
		else startTimer();
	};

	return (
		<div className={styles['timer']}>
			<div className={styles['timer__time-container']}>
				{isLoading || !isFetched ? (
					<TimerLoader />
				) : (
					<List
						items={formatedTimer}
						isHorizontal
						className={styles['timer__time-container-inner']}
						renderItem={(time, index) => (
							<div className={styles['timer__time-item']} key={index}>
								<div className={styles['timer__time-item-value']}>{time}</div>
								<p className={styles['timer__time-item-label']}>
									{labels[index]}
								</p>
							</div>
						)}
					/>
				)}
			</div>
			<div className={styles['timer__control']}>
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
		</div>
	);
};

export default Timer;
