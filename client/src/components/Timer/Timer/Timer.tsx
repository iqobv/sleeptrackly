'use client';

import { Button } from '@/components/UI';
import { useTimer } from '@/hooks';

import styles from './Timer.module.scss';
import TimerEnd from './TimerEnd/TimerEnd';

const labels = ['Hours', 'Minutes', 'Seconds'];

const Timer = () => {
	const {
		formatedTimer,
		isSleeping,
		isFinished,
		finishedSleep,
		startTimer,
		stopTimer,
	} = useTimer();

	const handleClick = () => {
		isSleeping ? stopTimer() : startTimer();
	};

	return (
		<div className={styles['timer']}>
			<div className={styles['timer__time-container']}>
				<div className={styles['timer__time-container-inner']}>
					{formatedTimer.map((time, index) => (
						<div className={styles['timer__time-item']} key={index}>
							<div className={styles['timer__time-item-value']}>{time}</div>
							<p className={styles['timer__time-item-label']}>
								{labels[index]}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className={styles['timer__control']}>
				{isFinished && !!finishedSleep ? (
					<TimerEnd data={finishedSleep} />
				) : (
					<Button onClick={handleClick}>
						{isSleeping ? 'Stop Timer' : 'Start Timer'}
					</Button>
				)}
			</div>
		</div>
	);
};

export default Timer;
